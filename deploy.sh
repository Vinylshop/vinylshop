#!/usr/bin/env bash

echo 'OMG We Are About to Deploy!!!'

git checkout -b deploy

git pull heroku master
webpack -p
git add -f public/bundle.js public/bundle.js.map
git commit --allow-empty -m 'Deploying'
git push heroku deploy:master

git checkout master
git branch -D deploy
