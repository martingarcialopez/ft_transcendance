FROM node:lts

WORKDIR /App

COPY ./App/* ./



RUN npm install -g npm@latest && \
npm install -g create-react-app 

ENTRYPOINT npm install && npm  start

