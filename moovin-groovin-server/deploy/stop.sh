#!/bin/sh
cd ~/app/moovin-groovin-server

npx pm2 delete all
npx pm2 flush

sudo rm -rf ~/app
