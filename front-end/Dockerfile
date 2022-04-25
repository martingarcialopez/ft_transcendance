FROM node:lts

WORKDIR /App

COPY ./* ./



RUN npm install -g npm@latest

ENTRYPOINT npm install && npm start

