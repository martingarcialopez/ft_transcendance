FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 8080

CMD ["npm", "start"]
