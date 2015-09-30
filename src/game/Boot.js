/** @constructor */
GameTitle =
{
  game: null,
  
  title: "Game Title",
  projectWebsite: "https://github.com/puzzud/gjweb",

  screenWidth: 960,
  screenHeight: 540,

  buttonStyle: { font: "32px Arial", fill: "#ffffff" }
};

GameTitle.run = function()
{
  this.game = new Phaser.Game( this.screenWidth, this.screenHeight,
                               Phaser.AUTO, "", this );

  this.game.state.add( "Boot", GameTitle.Boot );
  this.game.state.add( "Preloader", GameTitle.Preloader );
  this.game.state.add( "MainMenu", GameTitle.MainMenu );
  this.game.state.add( "Game", GameTitle.Game );

  this.game.state.start( "Boot" );
};

GameTitle.createTextButton = function( x, y, text, callback, callbackContext )
{
  var button = this.game.add.button( x, y, null, callback, callbackContext );
  button.anchor.setTo( 0.5, 0.5 );

  var label = new Phaser.Text( this.game, 0, 0, text, this.buttonStyle );
  label.anchor.setTo( 0.5, 0.5 );

  button.addChild( label );

  return button;
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

  this.stage.backgroundColor = 0x000000;
};

GameTitle.Boot.prototype.preload = function()
{
  
};

GameTitle.Boot.prototype.create = function()
{ 
  this.state.start( "Preloader" );
};
