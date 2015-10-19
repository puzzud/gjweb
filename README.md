# gjweb
A web based game template for game jams.

**Description**
This project serves as way to jump start a game jam with the basic structure
of a game (loading screen, main menu, game-play screen). The intention is to
make it available for quick copy, modification, extension, and distribution.
It's broken down into multiple files to also facilitate collaboration of
multiple contributors during a game jam.

**Requirements**
This project uses web based technologies:  HTML, CSS, and Javascript. It uses
the Phaser game engine. It should also be compliant with native wrapping
technologies such as Node-Webkit, Cordova, and Cocoon.

Phaser is not included in this repository. It must be added in addition to
checking out this repository. To do so, copy the phaser runtime files to the
source path. For example,
```
mkdir /path/to/gjweb/www/src/phaser
cp /path/to/phaser/build/phaser.* /path/to/gjweb/www/src/phaser
```

Three.js is used experimentally to provide a 3D layer in which to render.
Is not included in this repository. It must be added in addition to
checking out this repository. To do so, copy the phaser runtime files to the
source path. For example,
```
mkdir /path/to/gjweb/www/src/three
cp /path/to/three.js/build/phaser.* /path/to/gjweb/www/src/three
```

**Usage**
Typically HTML game related technologies, including Phaser, require a
special level of data file access. However, most browsers prevent this
sort of access to files on the local file system, as a security and
privacy precaution. Therefore, files be accessed via a remote web server.
There are multiple ways to accomplish such. Here's a rough explanation of
a simple approach (requires Python):
```
python -m SimpleHTTPServer 8081 /path/to/gjweb/www
```

The result is that your local machine will run a light weight web server
that hosts the game. Afterwards, navigate your web browser on the same
machine to:
```
http://localhost:8081
```

Alternatively, if you are using Chrome, it is possible to turn off this
security feature (do so at your own risk) by launching Chome with a
special parameter:
```
google-chrome  --allow-file-access-from-files
```
