/** @constructor */
GameTitle.PlatformSystem = function(game)
{
  this.game = game;

  this.nw = null;
  this.cordova = null;
};

GameTitle.PlatformSystem.prototype.init = function()
{
  this.setupNw();
  this.setupCordova();
};

GameTitle.PlatformSystem.prototype.setupNw = function()
{
  if(window.nw !== undefined)
  {
    this.nw = window.nw;
  }
};

GameTitle.PlatformSystem.prototype.setupCordova = function()
{
  if(window.cordova !== undefined)
  {
    this.cordova = window.cordova;
    document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
  }
};

GameTitle.PlatformSystem.prototype.onDeviceReady = function()
{
  document.addEventListener("backbutton", this.onBackButton.bind(this), false);
};

GameTitle.PlatformSystem.prototype.onBackButton = function(event)
{
  if(GameTitle.backButtonCallback !== null)
  {
    event.preventDefault();
    GameTitle.backButtonCallback.call(this.game.state.getCurrentState());
  }
};

GameTitle.PlatformSystem.prototype.show = function()
{
  if(this.nw !== null)
  {
    var window = this.nw.Window.get();
    window.show(); 
  }
};

GameTitle.PlatformSystem.prototype.quit = function()
{
  if(this.nw !== null)
  {
    // Close application window.
    var window = this.nw.Window.get();
    window.close();
  }
  else if(this.cordova !== null && cordova.platformId !== "browser")
  {
    // Close application.
    navigator.app.exitApp();
  }
};

GameTitle.PlatformSystem.prototype.canBeClosed = function()
{
  return (this.nw !== null || ((this.cordova !== null) && this.cordova.platformId !== "browser"));
};
