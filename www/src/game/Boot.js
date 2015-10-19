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
};

GameTitle.Boot.prototype.preload = function()
{
  
};

GameTitle.Boot.prototype.create = function()
{ 
  this.state.start( GameTitle.Preloader.stateKey );
};
