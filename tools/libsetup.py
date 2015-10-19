#!/usr/bin/python

import sys
import os
import urllib

# Default settings
setupPhaser = True
setupThree = False
replace = False

phaserName = "phaser"
phaserFileBaseUrl = "https://raw.githubusercontent.com/photonstorm/phaser/master/build"
phaserFileList = ["phaser.js", "phaser.map", "phaser.min.js"]
phaserSrcDir = "src/" + phaserName

threeName = "three"
threeFileBaseUrl = "https://raw.githubusercontent.com/mrdoob/three.js/master/build"
threeFileList = ["three.js", "three.min.js"]
threeSrcDir = "src/" + threeName

# Acquire parameters.
scriptName = sys.argv[0]

for arg in sys.argv:
  if arg == scriptName:
    continue
  if arg == threeName:
    setupThree = True
  if arg == "replace":
    replace = True

# Determine project root directory based on location of this script
# (assume script is in /tools).
pathToScript, justScriptName = os.path.split( scriptName )
GameHome = os.path.join( pathToScript, "../www" )

#-------------------------------------------------------------------------------
def setupLibrary( gameHome, libraryName, libraryFileBaseUrl, libraryFileList, librarySrcDir, replace = False ):
  print "Attempting to set up " + libraryName + "."
  
  # Determine if any of the files currently exist.
  for libraryFile in libraryFileList:
    destinationSrcDir = os.path.join( gameHome, librarySrcDir )
    if not os.path.isdir( destinationSrcDir ):
      os.mkdir( destinationSrcDir )
    
    destinationFile = os.path.join( destinationSrcDir, libraryFile )
    if os.path.isfile( destinationFile ):
      print "File already exists:  " + destinationFile
      
      if not replace:
        print "Doing nothing; \"replace\" parameter was not supplied."
        break
      else:
        print "Replacing:  " + libraryFile
        os.remove( destinationFile )
    else:    
      print "Downloading:  " + libraryFile
    
    sourceFile = libraryFileBaseUrl + "/" + libraryFile
    urllib.urlretrieve( sourceFile, destinationFile )
    
  print "Setup of " + libraryName + " is complete"
  print ""
  
  return 0

# Setup Phaser.
if setupPhaser:
  setupLibrary( GameHome, phaserName, phaserFileBaseUrl, phaserFileList, phaserSrcDir, replace )
  
# Setup Three.
if setupThree:
  setupLibrary( GameHome, threeName, threeFileBaseUrl, threeFileList, threeSrcDir, replace )

sys.exit( 0 )
