#!/bin/sh

# Configure reverse proxy
# see https://regbrain.com/article/node-nginx-ec2
#     https://www.tecmint.com/nginx-as-reverse-proxy-for-nodejs-app/
sudo cp ~/app/server/nginx/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
sudo chkconfig nginx on