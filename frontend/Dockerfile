FROM node:23.1-slim as build

ENV TERM=xterm-256color
WORKDIR /usr/src/app

RUN corepack enable
RUN yarn set version stable

COPY package.json yarn.lock ./
RUN yarn config set nodeLinker node-modules
RUN yarn install
COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]
