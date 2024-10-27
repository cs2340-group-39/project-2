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
  python3 \
  python3-pip \
  python3.12-venv \
  --no-install-recommends

# Install Python packages
RUN pip3 install ruff --break-system-packages

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_23.x | bash - \
  && apt-get install -y nodejs

# Install global Node.js packages
RUN npm install -g localtunnel

# Clean up unnecessary files
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set working directory
WORKDIR /app
