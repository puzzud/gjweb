/** @constructor */
GameTitle.MainMenu = function( game )
{
  this.cursorKeys = null;
  this.spaceBar = null;
  this.enterKey = null;

  this.buttonList = [];
  this.startButton = null;
  this.exitButton = null;

  this.titleStyle = { font: "72px Arial", fill: "#ffffff" };
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

  this.cursorKeys = this.input.keyboard.createCursorKeys();
  this.cursorKeys.up.onDown.add( this.upButtonDown, this );
  this.cursorKeys.down.onDown.add( this.downButtonDown, this );

  this.spaceBar = this.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
  this.spaceBar.onDown.add( this.activateButtonDown, this );
  this.enterKey = this.input.keyboard.addKey( Phaser.Keyboard.ENTER );
  this.enterKey.onDown.add( this.activateButtonDown, this );

  // Buttons.
  GameTitle.activeButton = null;
  
  this.startButton = GameTitle.createTextButton( this.game.world.centerX, this.game.world.centerY,
                                                "Start", this.startGame, this );

  this.exitButton  = GameTitle.createTextButton( this.game.world.centerX, this.game.world.centerY + 48,
                                                "Exit", this.exitGame, this );

  this.buttonList.length = 0;
  this.buttonList.push( this.startButton );
  this.buttonList.push( this.exitButton );

  var buttonGroup = this.game.add.group();
  buttonGroup.add( this.startButton );
  buttonGroup.add( this.exitButton );

  // All text.
  var allTextGroup = this.game.add.group();
  allTextGroup.add( titleText );
  allTextGroup.add( buttonGroup );
  allTextGroup.alpha = 0.0;

  this.game.add.tween( allTextGroup ).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true );
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

GameTitle.MainMenu.prototype.cycleActiveButton = function( direction )
{
  var index = -1;

  // Cycle active button.
  if( GameTitle.activeButton === null )
  {
    index = 0;
  }
  else
  {
    index = this.buttonList.indexOf( GameTitle.activeButton );
    GameTitle.setActiveButton( null );

    index += direction;
    if( index >= this.buttonList.length )
    {
      index = 0;
    }
    else
    if( index < 0 )
    {
      index = this.buttonList.length - 1;
    }
  }

  GameTitle.setActiveButton( this.buttonList[index] );
};

GameTitle.MainMenu.prototype.upButtonDown = function( button )
{
  this.cycleActiveButton( -1 );
};

GameTitle.MainMenu.prototype.downButtonDown = function( button )
{
  this.cycleActiveButton( 1 );
};

GameTitle.MainMenu.prototype.activateButtonDown = function( button )
{
  var activeButton = GameTitle.activeButton;
  if( activeButton === null )
  {
    return;
  }

  // TODO: Probably a better way to acquire and execute each button's
  // on button down event.
  if( activeButton === this.startButton )
  {
    this.startGame();
  }
  else
  if( activeButton === this.exitButton )
  {
    this.exitGame();
  }
};

GameTitle.MainMenu.prototype.update = function()
{
  this.layer3d.update();
};
