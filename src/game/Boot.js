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

  var contributor = null;
  var contributorName = "";
  
  var numberOfContributors = contributorList.length;
  for( var i = 0; i < numberOfContributors; i++ )
  {
    contributor = contributorList[i];

    if( contributor.firstName === undefined ||
        contributor.lastName === undefined )
    {
      // Set first and last names from full name.
      contributorName = contributor.name.split( " ", 2 );
      contributor.firstName = contributorName[0];
      contributor.lastName = contributorName[1];
    }
  }
};

GameTitle.Boot.prototype.contributorComparator = function( a, b )
{
  // Sort contributor list by last name, first name, and then contribution.
  var comparison = strcmp( a.lastName, b.lastName );
  if( comparison === 0 )
  {
    comparison = strcmp( a.firstName, b.firstName );
    if( comparison === 0 )
    {
      comparison = strcmp( a.contribution, b.contribution );
    }
  }

  return comparison;
};
