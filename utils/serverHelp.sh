#!/bin/bash

## pull code
git pull origin main

## npm install things
npm i

## restart PM2
pm2 restart app


