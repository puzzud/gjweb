/** @constructor */
GameTitle.Preloader = function( game )
{
  this.preloader = null;

  this.ready = false;
  this.soundDecoded = false;
};

GameTitle.Preloader.prototype.init = function()
{
  
};

GameTitle.Preloader.prototype.preload = function()
{
  this.soundDecoded = true; // TODO: Remove this when adding sounds & decoder callback.
};

GameTitle.Preloader.prototype.create = function()
{
  this.stage.backgroundColor = "#222222";
};

GameTitle.Preloader.prototype.update = function()
{
  if( this.soundDecoded )
  {
    this.ready = true;

    this.state.start( "MainMenu" );
  }
};
