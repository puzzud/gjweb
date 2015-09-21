/** @constructor */
GameTitle =
{
  title: "Game Title",
  projectWebsite: "https://github.com/puzzud/gj2dweb",

  screenWidth: 960,
  screenHeight: 540
};

GameTitle.run = function()
{
  var game = new Phaser.Game( this.screenWidth, this.screenHeight,
                              Phaser.AUTO, "", this );

  game.state.add( "Boot", GameTitle.Boot );
  game.state.add( "Preloader", GameTitle.Preloader );
  game.state.add( "MainMenu", GameTitle.MainMenu );
  game.state.add( "Game", GameTitle.Game );

  game.state.start( "Boot" );
};

/** @constructor */
GameTitle.Boot = function( game )
{
  
};

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

  this.stage.backgroundColor = "#000000";
};

GameTitle.Boot.prototype.preload = function()
{
  
};

GameTitle.Boot.prototype.create = function()
{ 
  this.state.start( "Preloader" );
};
