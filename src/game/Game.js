/** @constructor */
GameTitle.Game = function( game )
{
  this.ready = false;
  this.soundDecoded = false;
};

GameTitle.Game.prototype.init = function()
{
  //this.layer3d = new GameTitle.GameLayer3d( this.game );
};

GameTitle.Game.prototype.create = function()
{
  this.stage.backgroundColor = "#171642"; 
  
  this.input.onDown.add( this.pointerDown, this );
};

GameTitle.Game.prototype.update = function()
{
  //this.layer3d.update();
};

GameTitle.Game.prototype.pointerDown = function()
{
  this.returnToMainMenu();
};

GameTitle.Game.prototype.returnToMainMenu = function()
{
  this.state.start( "MainMenu" );
};
