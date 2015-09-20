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

  var titleTextX = this.world.centerX;
  var titleTextY = ( this.world.height * ( 1 - 0.67 ) ) | 0;
  
  var titleText = this.add.text( this.world.centerX, titleTextY - 32,
                                 GameTitle.title, this.titleStyle );

  titleText.anchor.setTo( 0.5 );

  this.input.onDown.addOnce( this.startGame, this );

  titleText.alpha = 0.0;
  this.game.add.tween( titleText ).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true );

  this.game.add.tween( titleText ).to( { y: titleTextY }, 500, Phaser.Easing.Bounce.Out, true );
};

GameTitle.MainMenu.prototype.startGame = function()
{
  this.state.start( "Game" );
};
