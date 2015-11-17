/** @constructor */
GameTitle.MainMenu = function( game )
{
  this.cursorKeys = null;
  this.spaceBar = null;
  this.enterKey = null;
  this.escapeKey = null;

  this.buttonList = [];
  this.startButton = null;
  this.aboutButton = null;
  this.exitButton = null;
  this.buttonGroup = null;

  this.soundList = [];
};

GameTitle.MainMenu.stateKey = "MainMenu";

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

  this.setupInput();
  this.setupGraphics();
};

GameTitle.MainMenu.prototype.setupInput = function()
{
  GameTitle.setupButtonKeys( this );

  this.escapeKey = this.input.keyboard.addKey( Phaser.Keyboard.ESC );
  this.escapeKey.onDown.add( this.escapeKeyDown, this );

  GameTitle.backButtonCallback = this.escapeKeyDown;

  // Buttons.
  this.startButton = GameTitle.createTextButton( this.game.world.centerX, this.game.world.centerY + 48 * 0,
                                                 "Play", this.startGame, this );

  this.aboutButton = GameTitle.createTextButton( this.game.world.centerX, this.game.world.centerY + 48 * 1,
                                                 "About", this.goToAboutScreen, this );

  this.exitButton  = GameTitle.createTextButton( this.game.world.centerX, this.game.world.centerY + 48 * 2,
                                                 "Quit", this.exitGame, this );

  this.buttonList.length = 0;
  this.buttonList.push( this.startButton );
  this.buttonList.push( this.aboutButton );
  this.buttonList.push( this.exitButton );

  this.buttonGroup = this.game.add.group();
  this.buttonGroup.add( this.startButton );
  this.buttonGroup.add( this.aboutButton );
  this.buttonGroup.add( this.exitButton );

  GameTitle.activeButton = null;
  GameTitle.setActiveButton( this.startButton );

  GameTitle.setupGamepadsForMenu();
};

GameTitle.MainMenu.prototype.setupGraphics = function()
{
  GameTitle.setupTitleAndText( this );
};

GameTitle.MainMenu.prototype.startGame = function()
{
  this.game.sound.stopAll();

  this.state.start( GameTitle.Game.stateKey );
};

GameTitle.MainMenu.prototype.goToAboutScreen = function()
{
  this.state.start( GameTitle.About.stateKey );
};

GameTitle.MainMenu.prototype.escapeKeyDown = function()
{
  GameTitle.setActiveButton( this.exitButton );

  this.exitGame();
};

GameTitle.MainMenu.prototype.exitGame = function()
{
  GameTitle.quit();
};

GameTitle.MainMenu.prototype.update = function()
{
  this.layer3d.update();
};
