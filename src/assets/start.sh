#!/bin/bash

VERSION=<%= version %>

set -e

docker rm -f wekan || true

sudo docker pull wekanteam/wekan:$VERSION

sudo docker run \
  -d \
  --restart=always \
  -p 5000:80 \
  --link=mongodb:mongodb \
  -e MONGO_URL="mongodb://mongodb:27017/" \
  -e ROOT_URL=http://localhost:5000 \
  --name=wekan \
  wekanteam/wekan:$VERSION
