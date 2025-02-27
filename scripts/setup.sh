#!/usr/bin/env sh

MODE=$1 # dev | prod

setup() {
    if [ "$MODE" = "dev" ]; then
        yes | cp -rf "configs/dev/google-services.json" android/app
        yes | cp -rf "configs/dev/GoogleService-Info.plist" ios
        yes | cp -rf "configs/dev/.env.dev" .env
    elif [ "$MODE" = "prod" ]; then
        yes | cp -rf "configs/prod/google-services.json" android/app
        yes | cp -rf "configs/prod/GoogleService-Info.plist" ios
        yes | cp -rf "configs/prod/.env.prod" .env
    else
        echo "Invalid mode. Please use 'dev' or 'prod'."
    fi
}

setup