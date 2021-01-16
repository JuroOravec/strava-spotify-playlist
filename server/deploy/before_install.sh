#!/bin/sh
cd ~
yum update
# Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
sudo yum install -y gcc-c++ make
# Reverse proxy
amazon-linux-extras install -y nginx1
