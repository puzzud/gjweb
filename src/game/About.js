/** @constructor */
GameTitle.About = function( game )
{
  this.cursorKeys = null;
  this.spaceBar = null;
  this.enterKey = null;

  this.buttonList = [];
  this.exitButton = null;
  this.buttonGroup = null;
};

GameTitle.About.prototype.init = function()
{
  
};

GameTitle.About.prototype.preload = function()
{
  
};

GameTitle.About.prototype.create = function()
{
  this.stage.backgroundColor = 0x444444; 

  this.setupInput();
  this.setupGraphics();
};

GameTitle.About.prototype.setupInput = function()
{
  GameTitle.setupButtonKeys( this );

  // Buttons.
  this.exitButton = GameTitle.createTextButton( this.game.world.centerX, this.game.world.centerY + 48,
                                                "Back", this.returnToMainMenu, this );

  this.buttonList.length = 0;
  this.buttonList.push( this.exitButton );

  this.buttonGroup = this.game.add.group();
  this.buttonGroup.add( this.exitButton );

  GameTitle.activeButton = null;
  GameTitle.setActiveButton( this.exitButton );
};

GameTitle.About.prototype.setupGraphics = function()
{
  GameTitle.setupTitleAndText( this );
};

GameTitle.About.prototype.returnToMainMenu = function()
{
  this.state.start( "MainMenu" );
};
