#!/bin/bash

echo "Build script"

cd backend || exit
npm install
cd ../frontend || exit
npm install
npm run build:ui