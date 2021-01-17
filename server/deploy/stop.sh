#!/bin/sh
cd ~/app/server

npx pm2 delete all

sudo rm -rf ~/app
