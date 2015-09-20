/** @constructor */
GameTitle.Game = function( game )
{
  this.ready = false;
  this.soundDecoded = false;
};

GameTitle.Game.prototype.init = function()
{
  
};

GameTitle.Game.prototype.create = function()
{
  this.stage.backgroundColor = "#171642"; 
  
  this.input.onDown.add( this.pointerDown, this );
};

GameTitle.Game.prototype.update = function()
{
  
};

GameTitle.Game.prototype.pointerDown = function()
{
  this.returnToMainMenu();
};

GameTitle.Game.prototype.returnToMainMenu = function()
{
  this.state.start( "MainMenu" );
};
