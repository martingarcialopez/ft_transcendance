#!/bin/sh

curl -sL https://deb.nodesource.com/setup_16.x |  bash


apt-get install -y nodejs

apt-get -y update && apt-get install -y procps

apt-get -y upgrade


npm install -g npm@8.5.5


npm install -g create-react-app

# create-react-app awesome-project --template typescript

# create-react-app awesome-project

# cd awesome-project
cd /my-app
npm install
npm install react-icons --save
npm start
