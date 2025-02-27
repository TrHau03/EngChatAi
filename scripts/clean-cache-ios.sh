#!/usr/bin/env sh

cd ios
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf Pods
rm -rf Podfile.lock
pod deintegrate
pod setup
pod install
cd ..