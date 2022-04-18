FROM node:lts

WORKDIR /App

COPY ./App/package*.json ./

RUN npm install && \
	mkdir node_modules/.cache && \
	chmod -R 777 node_modules/.cache

EXPOSE 8080

COPY ./App /App

CMD ["npm", "start"]
