#!/bin/sh

# curl -sL https://deb.nodesource.com/setup_14.x 

curl -sL https://deb.nodesource.com/setup_16.x |  bash

# apt install -y nodejs

apt-get install -y nodejs

apt-get -y update

apt-get -y upgrade

# npm i tar

npm install -g npm@8.5.5

# npm install tar@6 -g
# npm  cache clear --force

npm install -g create-react-app

create-react-app awesome-project

cd awesome-project

npm start
