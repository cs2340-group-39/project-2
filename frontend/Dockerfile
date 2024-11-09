FROM node:alpine

WORKDIR /usr/src/app

RUN npm install -g corepack
RUN corepack enable
RUN npm install -g @expo/ngrok@^4.1.0

COPY package.json yarn.lock ./
RUN npm install expo
RUN yarn install
COPY . .

EXPOSE 8081

CMD [ "npx", "expo", "start", "--tunnel" ]
