#!/bin/sh
cd ~/app/server
npm ci
npm run build

pm2 start dist/index.js -i 0 --name="strava-spotify-playlist"
