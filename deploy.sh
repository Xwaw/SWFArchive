  GNU nano 7.2                                   deploy.sh
#!/usr/bin/env bash
set -e

APP_DIR="/var/www/SWFArchive"
FRONTEND_DIR="$APP_DIR/Frontend"
BUILD_DIR="$FRONTEND_DIR/dist"
STATIC_TARGET="/var/www/frontend"
BACKEND_PROJECT="$APP_DIR/Backend/Backend.csproj"
PUBLISH_DIR="/var/www/backend"

BRANCH="master"

echo "===> Deploy started"
cd "$APP_DIR"

echo "===> Pulling latest code"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "===> Building React frontend"
cd "$FRONTEND_DIR"
npm install
npm run build

echo "===> Copying static files"
sudo mkdir -p "$STATIC_TARGET"
sudo rm -rf "$STATIC_TARGET"/*
sudo cp -r "$BUILD_DIR"/. "$STATIC_TARGET"/

sudo systemctl stop backend.service
dotnet publish "$BACKEND_PROJECT" \
  -c Release \
  -r linux-x64 \
  --self-contained true \
  -p:PublishSingleFile=true \
  -o "$PUBLISH_DIR"

sudo systemctl start backend.service

echo "===> Deploy finished"



