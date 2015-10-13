MIN_NUM_ARGUMENTS=2

if [ "$#" -lt "$MIN_NUM_ARGUMENTS" ];
then
  echo "rename.sh takes a minimum of $MIN_NUM_ARGUMENTS arguments."
  echo "rename.sh /path/to/game/home NewGameName"
  #echo "Optionally, a nice name (which supports spaces) can be supplied."
  #echo "rename.sh /path/to/game/home NewGameName \"New Game Name\""
  exit 1
fi

GAME_HOME=$1
GAME_SAFE_NAME=$2
GAME_NICE_NAME=$3

# Find all the candidate files.
FILE_LIST=`find $GAME_HOME -type f | grep -v ".git" | grep -v "$GAME_HOME/tools/rename.sh"`
DIR_LIST=`find $GAME_HOME -type d | grep -v ".git" | grep -v "$GAME_HOME/tools"`

echo "Attempt to replace any references to GameTitle in its name."
for f in $FILE_LIST
do
  #echo $f

  sed -i -- "s/GameTitle/$GAME_SAFE_NAME/g" $f
  if [ "$?" == "0" ];
  then
    echo "Found at least one match in file contents:  $f"
  fi
done
echo ""

echo "Attempt to rename any directories with GameTitle in its name."
for d in $DIR_LIST
do
  #echo $d

  RENAMED_DIR=`echo $d | sed -e "s/GameTitle/$GAME_SAFE_NAME/g"`
  if [ "$RENAMED_DIR" != "$d" ];
  then
    echo "Found at least one match in directory name:  $d"
    mv $d $RENAMED_DIR
  fi
done
echo ""

echo "Attempt to rename any files with GameTitle in its name."
for f in $FILE_LIST
do
  #echo $f

  RENAMED_FILE=`echo $f | sed -e "s/GameTitle/$GAME_SAFE_NAME/g"`
  if [ "$RENAMED_FILE" != "$f" ];
  then
    echo "Found at least one match in file name:  $f"
    mv $f $RENAMED_FILE
  fi
done
echo ""

exit 0
