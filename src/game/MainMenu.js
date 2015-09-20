/** @constructor */
GameTitle.MainMenu = function( game )
{
  this.titleStyle = { font: "72px Arial", fill: "#ffffff" };
};

GameTitle.MainMenu.prototype.init = function()
{
  
};

GameTitle.MainMenu.prototype.preload = function()
{
  
};

GameTitle.MainMenu.prototype.create = function()
{
  this.stage.backgroundColor = "#444444"; 
  
  var titleText = this.add.text( this.world.centerX, ( this.world.height * ( 1 - 0.67 ) ) | 0,
                                 GameTitle.title, this.titleStyle );

  titleText.anchor.setTo( 0.5 );

  this.input.onDown.addOnce( this.startGame, this );
};

GameTitle.MainMenu.prototype.startGame = function()
{
  this.state.start( "Game" );
};
