/** @constructor */
GameTitle.Boot = function( game )
{
  
};

GameTitle.Boot.stateKey = "Boot";

GameTitle.Boot.prototype.init = function()
{
  this.stage.disableVisibilityChange = false;
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = ( this.screenWidth / 2 ) | 0;
  this.scale.minHeight = ( this.screenHeight / 2 ) | 0;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.stage.forcePortrait = true;

  this.input.maxPointers = 1;
  this.input.addPointer();

  this.stage.backgroundColor = 0x000000;

  this.game.input.gamepad.start();
  GameTitle.gamepadList.push( this.game.input.gamepad.pad1 );
  GameTitle.gamepadList.push( this.game.input.gamepad.pad2 );
  GameTitle.gamepadList.push( this.game.input.gamepad.pad3 );
  GameTitle.gamepadList.push( this.game.input.gamepad.pad4 );
};

GameTitle.Boot.prototype.preload = function()
{
  this.game.load.json( "projectInfo", "package.json", true );
};

GameTitle.Boot.prototype.create = function()
{
  GameTitle.projectInfo = this.game.cache.getJSON( "projectInfo" );

  this.processSettings();

  this.state.start( GameTitle.Preloader.stateKey );
};

GameTitle.Boot.prototype.processSettings = function()
{
  this.processContributorList();
};

GameTitle.Boot.prototype.processContributorList = function()
{
  if( GameTitle.projectInfo === null ||
      GameTitle.projectInfo.contributors === undefined )
  {
    return;
  }

  var contributorList = GameTitle.projectInfo.contributors;
  contributorList.sort( this.contributorComparator );
};

GameTitle.Boot.prototype.contributorComparator = function( a, b )
{
  // Sort contributor list by last name, first name, and then contribution.
  
  // Pull first and last names from full name.
  var aContributorName = a.name.split( " ", 2 );
  var bContributorName = b.name.split( " ", 2 );
  
  var aLastName = ( aContributorName[0] === undefined ) ? "" : aContributorName[0];
  var bLastName = ( bContributorName[0] === undefined ) ? "" : bContributorName[0];

  var comparison = strcmp( aLastName, bLastName );
  if( comparison === 0 )
  {
    var aFirstName = ( aContributorName[1] === undefined ) ? "" : aContributorName[1];
    var bFirstName = ( bContributorName[1] === undefined ) ? "" : bContributorName[1];
  
    comparison = strcmp( aFirstName, bFirstName );
    if( comparison === 0 )
    {
      comparison = strcmp( a.contribution, b.contribution );
    }
  }

  return comparison;
};
