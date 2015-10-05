/** @constructor */
GameTitle.Preloader = function( game )
{
  this.preloader = null;
};

GameTitle.Preloader.prototype.init = function()
{
  
};

GameTitle.Preloader.prototype.preload = function()
{
  this.load.audio( "bell2", "assets/sounds/bell2.wav" );
};

GameTitle.Preloader.prototype.create = function()
{
  this.stage.backgroundColor = 0x222222;

  var bell2 = this.game.add.audio( "bell2" );

  var soundList = [bell2];

  this.sound.setDecodedCallback( soundList, this.allSoundsDecoded, this );
};

GameTitle.Preloader.prototype.allSoundsDecoded = function()
{
  this.start();
};

GameTitle.Preloader.prototype.start = function()
{
  this.state.start( "MainMenu" );
};
