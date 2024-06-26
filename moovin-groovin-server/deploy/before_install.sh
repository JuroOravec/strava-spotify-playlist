#!/bin/sh
cd ~
yum update
# Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
# Global npm packages 
npm i -g ts-node
npm i -g prisma @prisma/client
# Reverse proxy
sudo amazon-linux-extras install -y nginx1
