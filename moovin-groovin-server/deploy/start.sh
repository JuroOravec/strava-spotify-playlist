#!/bin/sh
cd ~/app
npm run build:server
cd ./moovin-groovin-server
pm2 install pm2-logrotate
APP_PM2_LOG_OUT=~/log/app.out.log APP_PM2_LOG_ERR=~/log/app.err.log npm run start:prd
