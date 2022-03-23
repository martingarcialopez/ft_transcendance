#!/bin/sh

apt-get -y update

apt-get -y upgrade

echo "\n\n***********************installing  npm@8.5.5************************"

npm install -g npm@8.5.5


echo "\n\n***********************installing nestJs************************"
npm i -g @nestjs/cli


echo "\n\n******************creating project***************"

nest new test  --package-manager npm

cd test

echo "\n\n******************start ***************"
npm run start

echo "\n\n***********************sleepin infini************************"

sleep infinity