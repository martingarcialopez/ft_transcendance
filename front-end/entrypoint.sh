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
# cd /my-pp

echo "\n*****install dig, nslookup, host commands in Debian based server*******\n"
sleep 5
apt  -y update
apt-get install dnsutils -y
sleep 5
export FT_NESTJS=`host ft_nestjs | cut -b 23-`
echo `host ft_nestjs | cut -b 23- `  "ft_nestjs" >> /etc/hostname

npm install
npm install react-icons --save
npm start
