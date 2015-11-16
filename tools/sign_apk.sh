KEYSTORE=$1
ALIAS=$2
APK=$3
NEW_APK=$4

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE $APK $ALIAS
zipalign -v 4 $APK $NEW_APK

if [ "$APK" != "$NEW_APK" ]; then
  rm -f $APK
fi

exit 0
