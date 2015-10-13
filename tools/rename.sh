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

function rename() {
  REPLACEMENT_PATTERN="s/$1/$2/g"
  #echo $REPLACEMENT_PATTERN
  #return 0;

  echo "Attempt to replace any references to $1 in its name."
  for f in $FILE_LIST
  do
    #echo $f

    sed -i -- "$REPLACEMENT_PATTERN" $f
    if [ "$?" == "0" ];
    then
      echo "Found at least one match in file contents:  $f"
    fi
  done
  echo ""

  echo "Attempt to rename any directories with $1 in its name."
  for d in $DIR_LIST
  do
    #echo $d

    RENAMED_DIR=`echo $d | sed -e "$REPLACEMENT_PATTERN"`
    if [ "$RENAMED_DIR" != "$d" ];
    then
      echo "Found at least one match in directory name:  $d"
      mv "$d" "$RENAMED_DIR"
    fi
  done
  echo ""

  echo "Attempt to rename any files with $1 in its name."
  for f in $FILE_LIST
  do
    #echo $f

    RENAMED_FILE=`echo $f | sed -e "$REPLACEMENT_PATTERN"`
    if [ "$RENAMED_FILE" != "$f" ];
    then
      echo "Found at least one match in file name:  $f"
      mv "$f" "$RENAMED_FILE"
    fi
  done
  echo ""
}

rename "GameTitle" "$GAME_SAFE_NAME"
#rename "Game Title" "$GAME_NICE_NAME"

exit 0
