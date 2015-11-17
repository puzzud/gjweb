echo "=== Uninstall APK ==="
adb uninstall com.gametitle.gametitle

echo "=== Install APK ==="
adb install build/debug/gametitle/android/android-armv7-debug.apk

echo "=== Run APK ==="
adb shell monkey -p com.gametitle.gametitle -c android.intent.category.LAUNCHER 1

