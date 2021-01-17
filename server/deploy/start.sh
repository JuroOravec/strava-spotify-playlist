#!/bin/sh
cd ~/app/server
npm ci
npm run build

NODE_ENV=production STRAVA_VERIFY_TOKEN_SEED=$(date +%s) npx pm2 start dist/index.js -i 0 --name="moovin-groovin-server" --watch --ignore-watch="node_modules"
