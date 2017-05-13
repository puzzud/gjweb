/** @constructor */
GameTitle.MainMenu = function(game)
{
  this.menuSystem = new GameTitle.MenuSystem(game, this);

  this.soundList = [];
};

GameTitle.MainMenu.stateKey = "MainMenu";

GameTitle.MainMenu.prototype.init = function()
{
  
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
  this.menuSystem.init();
  this.menuSystem.setBackEvent(this.quitGame, this);

  // Buttons.
  var playButton = this.menuSystem.addButton(this.game.world.centerX, this.game.world.centerY + 48 * 0,
    "Play", this.playGame, this);

  var aboutButton = this.menuSystem.addButton(this.game.world.centerX, this.game.world.centerY + 48 * 1,
    "About", this.goToAboutScreen, this);

  var exitButton  = this.menuSystem.addButton(this.game.world.centerX, this.game.world.centerY + 48 * 2,
    "Quit", this.quitGame, this);

  this.menuSystem.setActiveButton(playButton);
};

GameTitle.MainMenu.prototype.setupGraphics = function()
{
  GameTitle.setupTitleAndText(this, this.menuSystem);
};

GameTitle.MainMenu.prototype.playGame = function()
{
  this.game.sound.stopAll();

  this.state.start(GameTitle.Game.stateKey);
};

GameTitle.MainMenu.prototype.goToAboutScreen = function()
{
  this.state.start(GameTitle.About.stateKey);
};

GameTitle.MainMenu.prototype.quitGame = function()
{
  GameTitle.quit();
};

GameTitle.MainMenu.prototype.update = function()
{
  
};
