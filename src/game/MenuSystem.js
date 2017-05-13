/** @constructor */
GameTitle.MenuSystem = function(game, state)
{
  this.game = game;
  this.state = state;

  this.buttonTextColor = 0xffffff;
  this.buttonTextOverColor = 0xffff00;
  this.buttonStyle = {font: "32px Arial", fill: "#ffffff", stroke: "#000000", strokeThickness: 4};
  this.buttonActiveStyle = {font: "32px Arial", fill: "#ffffff", fontStyle: "italic", stroke: "#000000", strokeThickness: 4};

  this.buttonList = [];
  this.buttonGroup = null;

  this.activeButton = null;

  this.modalYesButton = null;
  this.modalNoButton = null;
  this.modalGroup = null;
};

GameTitle.MenuSystem.prototype.init = function()
{
  this.setupButtonKeys(this.state);

  this.buttonList.length = 0;
  this.buttonGroup = this.game.add.group();

  this.activeButton = null;
  this.setActiveButton(null);

  /*
  // Modal dialog buttons.
  this.modalYesButton = GameTitle.createTextButton(0, 0,
                                                    "Yes", this.exitGame, this);
  this.modalYesButton.position.setTo(this.game.world.centerX, this.game.world.centerY + 48 * 1);
  this.modalYesButton.input.priorityID = 3;

  this.modalNoButton = GameTitle.createTextButton(0, 0,
                                                   "No", this.toggleModal, this);
  this.modalNoButton.position.setTo(this.game.world.centerX, this.game.world.centerY + 48 * 2);
  this.modalNoButton.input.priorityID = 3;

  GameTitle.setupGamepadsForMenu();*/

  /*
  // Set up modal background.
  var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = "rgba(0,0,0,0.5)";
  bmd.ctx.fillRect(0, 0, this.game.width, 48 * 3);
  bmd.ctx.fillRect(0, 48 * 9, this.game.width, 48 * 3);
  bmd.ctx.fillStyle = "rgba(0,0,0,0.95)";
  bmd.ctx.fillRect(0, 48 * 3, this.game.width, 48 * 6);
  
  var modalBackground = this.game.add.sprite(0, 0, bmd);
  modalBackground.fixedToCamera = true;
  modalBackground.inputEnabled = true;
  modalBackground.input.priorityID = 2;

  var modalPromptText = "Are you sure you want to quit?";
  var modalPrompt = this.game.add.text(0, 0, modalPromptText, GameTitle.buttonStyle);
  modalPrompt.position.setTo(this.game.world.centerX, this.game.world.centerY - 48 * 1);
  modalPrompt.anchor.setTo(0.5, 0.5);

  this.modalGroup = this.game.add.group();
  this.modalGroup.add(modalBackground);
  this.modalGroup.add(modalPrompt);
  this.modalGroup.add(this.modalYesButton);
  this.modalGroup.add(this.modalNoButton);
  this.modalGroup.visible = false;
  */
};

GameTitle.MenuSystem.prototype.addButton = function(x, y, text, callback, context, style)
{
  var button = this.createTextButton(x, y, text, callback, context, style);

  this.buttonList.push(button);
  this.buttonGroup.add(button);

  return button;
};

GameTitle.MenuSystem.prototype.setupButtonKeys = function()
{
  this.state.cursorKeys = this.state.input.keyboard.createCursorKeys();
  this.state.cursorKeys.up.onDown.add(this.upButtonDown, this);
  this.state.cursorKeys.down.onDown.add(this.downButtonDown, this);

  this.state.spaceBar = this.state.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.state.spaceBar.onDown.add(this.activateButtonDown, this);
  this.state.enterKey = this.state.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  this.state.enterKey.onDown.add(this.activateButtonDown, this);
};

GameTitle.MenuSystem.prototype.clearButtonKeys = function(state)
{
  this.state.cursorKeys.up.onDown.removeAll();
  this.state.cursorKeys.down.onDown.removeAll();
  this.state.cursorKeys = null;
  
  this.state.spaceBar.onDown.removeAll();
  this.state.spaceBar = null;
  this.state.enterKey.onDown.removeAll();
  this.state.enterKey = null;
};

GameTitle.MenuSystem.prototype.cycleActiveButton = function(direction)
{
  var index = -1;

  // Cycle active button.
  if(this.activeButton === null)
  {
    index = 0;
 }
  else
  {
    index = this.buttonList.indexOf(this.activeButton);
    var currentIndex = index;

    index += direction;
    if(index >= this.buttonList.length)
    {
      index = 0;
   }
    else
    if(index < 0)
    {
      index = this.buttonList.length - 1;
   }

    if(currentIndex === index)
    {
      // No need to change active buttons.
      return;
   }

    this.setActiveButton(null);
 }

  this.setActiveButton(this.buttonList[index]);
};

GameTitle.MenuSystem.prototype.upButtonDown = function(button)
{
  this.cycleActiveButton(-1);
};

GameTitle.MenuSystem.prototype.downButtonDown = function(button)
{
  this.cycleActiveButton(1);
};

GameTitle.MenuSystem.prototype.activateButtonDown = function(button)
{
  var activeButton = this.activeButton;
  if(activeButton === null)
  {
    // Default active button to start button for quick navigation.
    activeButton = this.buttonList[0];
    if(activeButton === undefined)
    {
      activeButton = null;
    }
    
    this.setActiveButton(activeButton);
 }
  
  // Directly call state's logic for this button.
  activeButton.activate.call(this.state, activeButton, null);
};

GameTitle.MenuSystem.prototype.createTextButton = function(x, y, text, callback, callbackContext, style)
{
  var button = this.game.add.button(x, y, null, callback, callbackContext);
  button.anchor.setTo(0.5, 0.5);

  if(style === undefined)
  {
    style = this.buttonStyle;
  }
  
  var label = new Phaser.Text(this.game, 0, 0, text, style);
  label.anchor.setTo(0.5, 0.5);

  label.tint = this.buttonTextColor;

  button.addChild(label);
  button.texture.baseTexture.skipRender = false; // TODO: Remove when Phaser 2.4.5 releases with fix.

  button.events.onInputOver.add(this.textButtonOnInputOver, this);
  button.events.onInputOut.add(this.textButtonOnInputOut, this);

  button.activate = callback;

  return button;
};

GameTitle.MenuSystem.prototype.setActiveButton = function(button)
{
  if(this.activeButton !== null)
  {
    this.activeButton.children[0].tint = this.buttonTextColor;
    this.game.add.tween(this.activeButton.scale).to({x: 1.0, y: 1.0}, 125, Phaser.Easing.Linear.None, true);
 }

  this.activeButton = button;

  if(button !== null)
  {
    button.children[0].tint = this.buttonTextOverColor;
    this.game.add.tween(button.scale).to({x: 1.125, y: 1.125}, 125, Phaser.Easing.Linear.None, true);
 }
};

GameTitle.MenuSystem.prototype.textButtonOnInputOver = function(button, pointer)
{
  this.setActiveButton(button);
};

GameTitle.MenuSystem.prototype.textButtonOnInputOut = function(button, pointer)
{
  this.setActiveButton(null);
};

GameTitle.MenuSystem.prototype.setBackEvent = function(callback, callbackContext)
{
  var escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  escapeKey.onDown.add(callback, callbackContext);

  GameTitle.backButtonCallback = callback;
};

GameTitle.MenuSystem.prototype.escapeKeyDown = function(button)
{
  //GameTitle.setActiveButton(this.modalNoButton);

  //this.toggleModal();
};

/*
GameTitle.MenuSystem.prototype.toggleModal = function()
{
  this.modalGroup.visible = !this.modalGroup.visible;

  this.buttonList.length = 0;

  if(this.modalGroup.visible)
  {
    this.buttonList.push(this.modalYesButton);
    this.buttonList.push(this.modalNoButton);
  }
  else
  {
    this.buttonList.push(this.startButton);
    this.buttonList.push(this.aboutButton);
    this.buttonList.push(this.exitButton);

    GameTitle.setActiveButton(this.exitButton);
  }
};
*/
