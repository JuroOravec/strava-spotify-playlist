#!/bin/sh
cd ~/app/moovin-groovin-server
npm ci
npm run build
npm run start:prd
