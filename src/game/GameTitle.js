/** @constructor */
GameTitle =
{
  game: null,

  projectInfo: null,

  settings:
  {
    local:
    {
      mute: false
    },
    session:
    {

   }
 },

  screenWidth: 960,
  screenHeight: 540,

  titleStyle: {font: "72px Arial", fill: "#ffffff", stroke: "#000000", strokeThickness: 6},

  buttonTextColor: 0xffffff,
  buttonTextOverColor: 0xffff00,
  buttonStyle: {font: "32px Arial", fill: "#ffffff", stroke: "#000000", strokeThickness: 4},
  buttonActiveStyle: {font: "32px Arial", fill: "#ffffff", fontStyle: "italic", stroke: "#000000", strokeThickness: 4},

  activeButton: null,

  backButtonCallback: null,

  gamepadList: [],
  gamepadMenuCallbackList: [],
  lastGamepadYAxis: 0.0,

  // NW (formerly Node Webkit) container.
  nw:
  {
    gui: null,
    window: null
  }
};

GameTitle.run = function()
{
  this.game = new Phaser.Game(this.screenWidth, this.screenHeight,
                               Phaser.AUTO, "", this);

  this.game.state.add(GameTitle.Boot.stateKey, GameTitle.Boot);
  this.game.state.add(GameTitle.Preloader.stateKey, GameTitle.Preloader);
  this.game.state.add(GameTitle.MainMenu.stateKey, GameTitle.MainMenu);
  this.game.state.add(GameTitle.Game.stateKey, GameTitle.Game);
  this.game.state.add(GameTitle.About.stateKey, GameTitle.About);

  this.game.state.start(GameTitle.Boot.stateKey);

  this.setupPlatform();
};

GameTitle.setupPlatform = function()
{
  // TODO: Abstract differences between using NW JS and Cordova.
  this.setupNw();
  this.setupCordova();
};

GameTitle.setupNw = function()
{
  // Set up NW.
  if(typeof(require) !== "undefined")
  {
    try
    {
      this.nw.gui = require("nw.gui");
   }
    catch(exception)
    {
      this.nw.gui = null;
      this.nw.window = null;
      
      console.error("NW is not present.");
      return;
   }

    if(this.nw.gui !== null)
    {
      this.nw.window = this.nw.gui.Window.get();
      //this.nw.window.show();
   }
 }
};

GameTitle.setupCordova = function()
{
  if(window.cordova !== undefined)
  {
    document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
 }
};

GameTitle.onDeviceReady = function()
{
  document.addEventListener("backbutton", this.onBackButton.bind(this), false);
};

GameTitle.onBackButton = function(event)
{
  if(this.backButtonCallback !== null)
  {
    event.preventDefault();
    this.backButtonCallback.call(this.game.state.getCurrentState());
 }
};

GameTitle.quit = function()
{
  if(GameTitle.nw.window !== null)
  {
    // Close application window.
    GameTitle.nw.window.close();
 }
  else
  if(window.cordova !== undefined && cordova.platformId !== "browser")
  {
    // Close application.
    navigator.app.exitApp();
 }
  else
  {
    // Redirect to project website if running in browser.
    if(GameTitle.projectInfo === null ||
        GameTitle.projectInfo.homepage === "")
    {
      console.warn("homepage not set in package.json.");
      return;
   }
    
    window.location = GameTitle.projectInfo.homepage;
 }
};

GameTitle.setupGamepadsForMenu = function()
{
  this.gamepadMenuCallbackList.length = 0;
  this.gamepadMenuCallbackList.onDown = this.gamepadOnDown;
  this.gamepadMenuCallbackList.onAxis = this.gamepadOnAxis;

  this.game.input.gamepad.addCallbacks(this, this.gamepadMenuCallbackList);
};

GameTitle.gamepadOnDown = function(buttonIndex, buttonValue, gamepadIndex)
{
  console.log(buttonIndex, buttonValue, gamepadIndex);

  var cycleDirection = 0;

  switch(buttonIndex)
  {
    case Phaser.Gamepad.XBOX360_DPAD_UP:
    {
      cycleDirection = -1;
      break;
   }

    case Phaser.Gamepad.XBOX360_DPAD_DOWN:
    {
      cycleDirection = 1;
      break;
   }
 }

  if(cycleDirection !== 0)
  {
    this.cycleActiveButton(cycleDirection);
 }
  else
  {
    if(buttonIndex === Phaser.Gamepad.XBOX360_B)
    {
      this.activateButtonDown(this.activeButton);
   }
 }
};

GameTitle.gamepadOnAxis = function(gamepad, axisIndex, axisValue)
{
  console.log(axisIndex, axisValue);

  if(axisIndex === Phaser.Gamepad.XBOX360_STICK_LEFT_Y)
  {
    var cycleDirection = 0;

    if(axisValue < -0.1 && this.lastGamepadYAxis >= -0.1)
    {
      cycleDirection = -1;
   }
    else
    if(axisValue > 0.1 && this.lastGamepadYAxis <= 0.1)
    {
      cycleDirection = 1;
   }

    this.lastGamepadYAxis = axisValue;

    if(cycleDirection !== 0)
    {
      this.cycleActiveButton(cycleDirection);
   }
 }
};

GameTitle.setupTitleAndText = function(state, menuSystem)
{
  // Title.
  var titleTextX = this.game.camera.width / 2;
  var titleTextY = (this.game.camera.height * (1 - 0.67)) | 0;
  
  var titleText = state.add.text(titleTextX, titleTextY,
                                  GameTitle.projectInfo.window.title, GameTitle.titleStyle);

  titleText.anchor.setTo(0.5);

  // All text.
  var allTextGroup = state.game.add.group();
  allTextGroup.add(titleText);
  allTextGroup.add(menuSystem.buttonGroup);
  allTextGroup.alpha = 0.0;
  allTextGroup.fixedToCamera = true;

  this.game.add.tween(allTextGroup).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
};

GameTitle.stopSounds = function(soundList)
{
  if(soundList === undefined)
  {
    this.game.sound.stopAll();
    return;
 }

  var sound = null;
  for(var i = 0; i < soundList.length; i++)
  {
    sound = soundList[i];
    sound.stop();
 }
};

GameTitle.getMute = function()
{
  return this.settings.local.mute;
};

GameTitle.setMute = function(mute)
{
  if(this.settings.local.mute !== mute)
  {
    this.settings.local.mute = mute;

    this.storeLocalSettings();
 }

  this.game.sound.mute = mute;
};

GameTitle.retrieveLocalSettings = function()
{
  if(typeof(Storage) === undefined)
  {
    console.warn("Local Storage not supported.");
    return;
 }

  var settingsLocal = localStorage.getItem("localSettings");
  if(settingsLocal === null)
  {
    // No local settings saved yet.
    return;
 }
  
  this.settings.local = JSON.parse(settingsLocal);

  // Do any actions that should come out of potentially changing
  // any local settings.
  this.setMute(this.settings.local.mute);
};

GameTitle.storeLocalSettings = function()
{
  if(typeof(Storage) === undefined)
  {
    console.warn("Local Storage not supported.");
    return;
 }

  localStorage.setItem("localSettings", JSON.stringify(this.settings.local));
};
