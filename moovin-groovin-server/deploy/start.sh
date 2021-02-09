#!/bin/sh
cd ~/app
npm run build:server
cd ./moovin-groovin-server
npm run start:prd
