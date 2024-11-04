FROM ubuntu

# Install required system packages
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  git \
  unzip \
  tmux \
  openssh-client \
  tor \
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
  dos2unix \
  --no-install-recommends

# Install Python packages
RUN pip3 install ruff --break-system-packages

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_23.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN npm config set strict-ssl false

# Install Node.js packages
RUN npm install --global --loglevel verbose yarn
RUN yarn global add @expo/ngrok@^4.1.0

# Set working directory
WORKDIR /app
