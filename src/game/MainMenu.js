/** @constructor */
GameTitle.MainMenu = function( game )
{
  this.titleStyle = { font: "72px Arial", fill: "#ffffff" };
  this.buttonStyle = { font: "32px Arial", fill: "#ffffff" };
};

GameTitle.MainMenu.prototype.init = function()
{
  this.layer3d = new GameTitle.GameLayer3d( this.game );
};

GameTitle.MainMenu.prototype.preload = function()
{
  
};

GameTitle.MainMenu.prototype.create = function()
{
  this.stage.backgroundColor = 0x444444; 

  // Title.
  var titleTextX = this.world.centerX;
  var titleTextY = ( this.world.height * ( 1 - 0.67 ) ) | 0;
  
  var titleText = this.add.text( this.world.centerX, titleTextY - 32,
                                 GameTitle.title, this.titleStyle );

  titleText.anchor.setTo( 0.5 );

  this.game.add.tween( titleText ).to( { y: titleTextY }, 500, Phaser.Easing.Bounce.Out, true );

  // Buttons.
  var startButton = this.createButton( this.game.world.centerX, this.game.world.centerY,
                                       "Start", this.startGame, this );

  var exitButton  = this.createButton( this.game.world.centerX, this.game.world.centerY + 48,
                                       "Exit", this.exitGame, this );

  var buttonGroup = this.game.add.group();
  buttonGroup.add( startButton );
  buttonGroup.add( exitButton );

  // All text.
  var allTextGroup = this.game.add.group();
  allTextGroup.add( titleText );
  allTextGroup.add( buttonGroup );
  allTextGroup.alpha = 0.0;

  this.game.add.tween( allTextGroup ).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true );
};

GameTitle.MainMenu.prototype.createButton = function( x, y, text, callback, callbackContext )
{
  var button = this.game.add.button( x, y, null, callback, callbackContext );
  button.anchor.setTo( 0.5, 0.5 );

  var label = new Phaser.Text( this.game, 0, 0, text, this.buttonStyle );
  label.anchor.setTo( 0.5, 0.5 );

  button.addChild( label );

  return button;
};

GameTitle.MainMenu.prototype.startGame = function()
{
  this.state.start( "Game" );
};

GameTitle.MainMenu.prototype.exitGame = function()
{
  // TODO: Redirect based on native or web application.
  window.location = GameTitle.projectWebsite;
};

GameTitle.MainMenu.prototype.update = function()
{
  this.layer3d.update();
};
