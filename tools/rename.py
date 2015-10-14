#!/usr/bin/python

import sys
import os
from glob import glob

scriptName = sys.argv[0]

MIN_NUM_ARGUMENTS = 2

numberOfArguments = len( sys.argv )
if numberOfArguments - 1 < MIN_NUM_ARGUMENTS:
  print scriptName + " takes a minimum of " + str( MIN_NUM_ARGUMENTS ) + " arguments."
  print scriptName + " /path/to/game/home NewGameName"
  print "Optionally, a nice name (which supports spaces) can be supplied."
  print scriptName + " /path/to/game/home NewGameName \"New Game Name\""
  sys.exit( 1 )

GAME_HOME = sys.argv[1]
GAME_SAFE_NAME = sys.argv[2]

if numberOfArguments - 1 > 2:
  GAME_NICE_NAME = sys.argv[3]
else:
  GAME_NICE_NAME = ""

# Find all the candidate files.
#FILE_LIST=`find $GAME_HOME -type f | grep -v ".git" | grep -v "$GAME_HOME/tools"`
#DIR_LIST=`find $GAME_HOME -type d | grep -v ".git" | grep -v "$GAME_HOME/tools"`
  
############################
def isPathValid( rootPath, path ):
  toolsPath = os.path.join( rootPath, "tools" )
  gitInPath = ".git"
  
  if gitInPath in path:
    return False
  if toolsPath in path:
    return False
  
  return True

############################
def getValidFiles( rootPath ):
  fileList = []

  for root, subFolders, files in os.walk( rootPath ):
    for file in files:
      path = os.path.join( root, file )
      if isPathValid( rootPath, path ):
        fileList.append( path )
        
  return fileList

############################
def getValidDirs( rootPath ):
  dirList = []
  
  for root, subFolders, files in os.walk( rootPath ):
    for dir in subFolders:
      path = os.path.join( root, dir )
      if isPathValid( rootPath, path ):
        dirList.append( path )
        
  return dirList

############################
#def rename( rootPath, sourceString, replacementString ):

#function rename() {
  #REPLACEMENT_PATTERN="s/$1/$2/g"
  ##echo $REPLACEMENT_PATTERN
  ##return 0;

  #echo "Attempt to replace any references to $1 in its name."
  #for f in $FILE_LIST
  #do
    ##echo $f

    #sed -i -- "$REPLACEMENT_PATTERN" $f
    #if [ "$?" == "0" ];
    #then
      #echo "Found at least one match in file contents:  $f"
    #fi
  #done
  #echo ""

  #echo "Attempt to rename any directories with $1 in its name."
  #for d in $DIR_LIST
  #do
    ##echo $d

    #RENAMED_DIR=`echo $d | sed -e "$REPLACEMENT_PATTERN"`
    #if [ "$RENAMED_DIR" != "$d" ];
    #then
      #echo "Found at least one match in directory name:  $d"
      #mv "$d" "$RENAMED_DIR"
    #fi
  #done
  #echo ""

  #echo "Attempt to rename any files with $1 in its name."
  #for f in $FILE_LIST
  #do
    ##echo $f

    #RENAMED_FILE=`echo $f | sed -e "$REPLACEMENT_PATTERN"`
    #if [ "$RENAMED_FILE" != "$f" ];
    #then
      #echo "Found at least one match in file name:  $f"
      #mv "$f" "$RENAMED_FILE"
    #fi
  #done
  #echo ""
#}

#rename "GameTitle" "$GAME_SAFE_NAME"
##rename "Game Title" "$GAME_NICE_NAME"

#exit 0


