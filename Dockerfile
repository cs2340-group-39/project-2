FROM --platform=$BUILDPLATFORM ubuntu

# Install required dependencies
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  git \
  unzip \
  build-essential \
  zlib1g-dev \
  libncurses5-dev \
  libgdbm-dev \
  libnss3-dev \
  libssl-dev \
  libreadline-dev \
  libffi-dev \
  libsqlite3-dev \
  libbz2-dev \
  ca-certificates \
  --no-install-recommends

# Install Python 3.13 from source
RUN wget --no-check-certificate https://www.python.org/ftp/python/3.13.0/Python-3.13.0a4.tgz \
  && tar -xf Python-3.13.0a4.tgz \
  && cd Python-3.13.0a4 \
  && ./configure --enable-optimizations \
  && make -j $(nproc) \
  && make install \
  && cd .. \
  && rm -rf Python-3.13.0a4 Python-3.13.0a4.tgz

# Create symbolic links (with force flag to overwrite if they exist)
RUN ln -sf /usr/local/bin/python3.13 /usr/local/bin/python3 \
  && ln -sf /usr/local/bin/python3.13 /usr/local/bin/python

# Install pip for Python 3.13
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3

# Install python packages
RUN pip3 install virtualenv ruff

# Install Deno based on architecture
RUN if [ "$(uname -m)" = "aarch64" ]; then \
  DENO_URL="https://github.com/denoland/deno/releases/latest/download/deno-aarch64-unknown-linux-gnu.zip"; \
  else \
  DENO_URL="https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip"; \
  fi && \
  curl -fsSL $DENO_URL -o deno.zip && \
  unzip deno.zip -d /usr/local/bin && \
  rm deno.zip && \
  chmod 755 /usr/local/bin/deno

# Clean up unnecessary files
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set working directory
WORKDIR /app