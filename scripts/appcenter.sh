#!/bin/bash
echo "Distributing apk to appcenter"
OWNER="MoamenMostafa"
APPID="Artikel-Welt-Android"
GROUP="Public"
FILE="android/app/build/outputs/apk/debug/app-debug.apk"
TOKEN="1569ed000b42c05781195eed06a7f7ab70a48a5a"
node node_modules/appcenter-cli/bin/appcenter.js distribute release --app $OWNER/$APPID --file $FILE --group "$GROUP" --token "$TOKEN"
