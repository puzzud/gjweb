/** @constructor */
GameTitle.Game = function( game )
{
  
};

GameTitle.Game.prototype.init = function()
{
  
};

GameTitle.Game.prototype.create = function()
{
  this.stage.backgroundColor = 0x171642; 

  // Buttons.
  var exitButton = GameTitle.createTextButton( 0, 32,
                                               "Exit", this.returnToMainMenu, this );

  exitButton.position.x = this.game.world.width - exitButton.width - 16;

  var buttonGroup = this.game.add.group();
  buttonGroup.add( exitButton );

  // All text.
  var allTextGroup = this.game.add.group();
  allTextGroup.add( buttonGroup );
  allTextGroup.alpha = 0.0;

  this.game.add.tween( allTextGroup ).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true );
  
  //this.input.onDown.add( this.pointerDown, this );
};

GameTitle.Game.prototype.update = function()
{
  
};

GameTitle.Game.prototype.pointerDown = function()
{

};

GameTitle.Game.prototype.returnToMainMenu = function()
{
  this.state.start( "MainMenu" );
};
