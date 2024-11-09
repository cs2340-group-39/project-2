FROM node:23-slim

ENV TERM=xterm-256color
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install -g expo @expo/ngrok
RUN npm install
COPY . .

EXPOSE 8081

CMD [ "npx", "expo", "start", "--tunnel" ]
