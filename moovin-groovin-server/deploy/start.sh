#!/bin/sh
cd ~/app/moovin-groovin-server
npm ci --also=dev
npm run build
npm run start:prd
