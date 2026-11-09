#!/bin/bash
# Captures the store screens from the booted iOS simulator and/or the running
# Android emulator. Requires MOCK_DATA on and ScreenshotDriver.ts installed.
#
# Usage: capture.sh <ios|android|both> <raw_dir>
# iOS captures land in <raw_dir>/ios, Android in <raw_dir>/android.
set -e

PLATFORM=${1:-both}
RAW=${2:-./raw}
ADB=${ADB:-$HOME/Library/Android/sdk/platform-tools/adb}
BUNDLE=app.com.koala
SERVER_DIR=$(mktemp -d)
PORT=8799

ios() { [ "$PLATFORM" = ios ] || [ "$PLATFORM" = both ]; }
android() { [ "$PLATFORM" = android ] || [ "$PLATFORM" = both ]; }
demo() { "$ADB" shell am broadcast -a com.android.systemui.demo -e command "$@" >/dev/null; }

mkdir -p "$RAW/ios" "$RAW/android"
echo '{"key":"0","screen":"HomeScreen"}' >"$SERVER_DIR/command"
python3 -m http.server $PORT --bind 127.0.0.1 --directory "$SERVER_DIR" >/dev/null 2>&1 &
SERVER=$!

cleanup() {
  kill $SERVER 2>/dev/null || true
  if ios; then xcrun simctl status_bar booted clear; fi
  if android; then
    demo exit
    "$ADB" reverse --remove tcp:$PORT 2>/dev/null || true
  fi
}
trap cleanup EXIT

if ios; then
  xcrun simctl status_bar booted override --time 9:41 --batteryState charged \
    --batteryLevel 100 --wifiBars 3 --cellularBars 4 --dataNetwork wifi
  xcrun simctl terminate booted $BUNDLE 2>/dev/null || true
  xcrun simctl launch booted $BUNDLE >/dev/null
fi

if android; then
  "$ADB" reverse tcp:8081 tcp:8081 >/dev/null
  "$ADB" reverse tcp:$PORT tcp:$PORT >/dev/null
  "$ADB" shell settings put global sysui_demo_allowed 1
  demo enter
  demo clock -e hhmm 0941
  demo battery -e level 100 -e plugged false
  demo network -e wifi show -e level 4 -e fully true
  demo network -e mobile hide
  demo notifications -e visible false
  "$ADB" shell am force-stop $BUNDLE
  "$ADB" shell am start -n $BUNDLE/$BUNDLE.MainActivity >/dev/null
fi

# Give both apps time to load the bundle from Metro
sleep 20

# capture <name> <screen> [params json] [seconds to wait]
capture() {
  echo "{\"key\":\"$(date +%s)$1\",\"screen\":\"$2\",\"params\":${3:-{\}}}" >"$SERVER_DIR/command"
  sleep "${4:-6}"
  if ios; then xcrun simctl io booted screenshot "$RAW/ios/$1.png" >/dev/null 2>&1; fi
  if android; then "$ADB" exec-out screencap -p >"$RAW/android/$1.png"; fi
  echo "captured $1"
}

SOFIA='{"id":1,"chatUserId":3,"name":"Sofia","username":"sofia","profilePhoto":"https://randomuser.me/api/portraits/women/27.jpg","conversationId":1}'

# Home first, opening Chats clears the unread badge
capture 1_home HomeScreen
capture 2_share ShareStack
# "Last online" only shows for 7 seconds after the chat opens
capture 3_chat ChatScreen "$SOFIA" 4
capture 5_stats SharedEmotionsScreen '{}' 7
capture 4_chats NotificationsScreen
