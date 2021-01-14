#!/bin/sh
cd ~
yum update
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y gcc-c++ make
