#!/usr/bin/env bash
set -e

# update instance
yum -y update

# add nodejs to yum
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum -y install nodejs

# install yarn
npm install -g yarn
npm install -g pm2
pm2 update