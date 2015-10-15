#!/usr/bin/python

import sys
import os

scriptName = sys.argv[0]

MIN_NUM_ARGUMENTS = 2

numberOfArguments = len( sys.argv )
if numberOfArguments - 1 < MIN_NUM_ARGUMENTS:
  print scriptName + " takes a minimum of " + str( MIN_NUM_ARGUMENTS ) + " arguments."
  print "python " + scriptName + " /path/to/game/home NewGameName"
  print "Optionally, a nice name (which supports spaces) can be supplied."
  print "python " + scriptName + " /path/to/game/home NewGameName \"New Game Name\""
  sys.exit( 1 )

GameHome = sys.argv[1]
GameSafeName = sys.argv[2]

if numberOfArguments - 1 > 2:
  GameNiceName = sys.argv[3]
else:
  GameNiceName = ""

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
def replaceStringsInFile( file, sourceString, replacementString ):
  tempFileName = "out.txt"
  
  modifiedFile = False
  
  with open( tempFileName, "wt" ) as fileOut:
    with open( file, "rt" ) as fileIn:
      for line in fileIn:
        newLine = line.replace( sourceString, replacementString )
        if newLine != line:
          modifiedFile = True
          fileOut.write( newLine )
        else:
          fileOut.write( line )
  
  if modifiedFile:
    os.remove( file )
    os.rename( tempFileName, file )
  else:
    os.remove( tempFileName )
    
  return modifiedFile

############################
def rename( rootPath, sourceString, replacementString ):
  fileList = getValidFiles( GameHome )
  dirList  = getValidDirs( GameHome )
  
  print "*** Attempt to replace any references to " + sourceString + " in a file's contents."
  for file in fileList:
    #print file
    
    replaced = replaceStringsInFile( file, sourceString, replacementString )
    if replaced:
      print "Found at least one match in file contents:  " + file
  print ""
  
  print "*** Attempt to rename any directories with " + sourceString + " in its name."
  for dir in dirList:
    #print dir
    renamedDir = dir.replace( sourceString, replacementString );
    
    replaced = False
    if renamedDir != dir:
      replaced = True
    if replaced:
      os.rename( dir, renamedDir )
      print "Found at least one match in directory name:  " + dir
  print ""
  
  print "*** Attempt to rename any files with " + sourceString + " in its name."
  for file in fileList:
    #print file
    renamedFile = file.replace( sourceString, replacementString );
    
    replaced = False
    if renamedFile != file:
      replaced = True
    if replaced:
      os.rename( file, renamedFile )
      print "Found at least one match in file name:  " + file
  print ""

# Rename references of files and in contents of files with specified arguments.
rename( GameHome, "GameTitle", GameSafeName )

if GameNiceName != "":
  rename( GameHome, "Game Title", GameNiceName )

sys.exit( 0 )
