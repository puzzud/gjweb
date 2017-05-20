/** @constructor */
GameTitle.Title = function(game)
{
  this.menuSystem = new GameTitle.MenuSystem(game, this);

  this.soundList = [];
};

GameTitle.Title.stateKey = "Title";

GameTitle.Title.prototype.init = function()
{
  
};

GameTitle.Title.prototype.preload = function()
{
  
};

GameTitle.Title.prototype.create = function()
{
  this.stage.backgroundColor = 0x444444; 

  this.setupInput();
  this.setupGraphics();
};

GameTitle.Title.prototype.setupInput = function()
{
  this.menuSystem.init();
  this.menuSystem.setBackEvent(this.quitGame, this);
  this.menuSystem.enableButtonKeys(true, this);

  // Buttons.
  var playButton = this.menuSystem.addButton(this.game.camera.width / 2, (this.game.camera.height / 2) + 48 * 0,
    "Play", this.playGame, this);

  var aboutButton = this.menuSystem.addButton(this.game.camera.width / 2, (this.game.camera.height / 2) + 48 * 1,
    "About", this.goToAboutScreen, this);

  if(GameTitle.nw.gui !== null || window.cordova !== undefined)
  {
    var exitButton  = this.menuSystem.addButton(this.game.camera.width / 2, (this.game.camera.height / 2) + 48 * 2,
      "Quit", this.quitGame, this);
  }
  
  this.menuSystem.setActiveButton(playButton);
};

GameTitle.Title.prototype.setupGraphics = function()
{
  GameTitle.setupTitleAndText(this, this.menuSystem);
};

GameTitle.Title.prototype.playGame = function()
{
  this.game.sound.stopAll();

  this.state.start(GameTitle.Game.stateKey);
};

GameTitle.Title.prototype.goToAboutScreen = function()
{
  this.state.start(GameTitle.About.stateKey);
};

GameTitle.Title.prototype.quitGame = function()
{
  GameTitle.quit();
};

GameTitle.Title.prototype.update = function()
{
  
};
