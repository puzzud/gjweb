/** @constructor */
GameTitle.Game = function( game )
{
  this.pointer = null;

  this.escapeKey = null;

  this.exitButton = null;
  this.buttonGroup = null;

  this.circleSprite = null;

  this.bell = null;
  this.soundList = [];
};

GameTitle.Game.stateKey = "Game";

GameTitle.Game.prototype.init = function()
{
  
};

GameTitle.Game.prototype.create = function()
{
  this.stage.backgroundColor = 0x171642; 

  this.setupInput();
  this.setupGraphics();
  this.setupSounds();
};

GameTitle.Game.prototype.setupInput = function()
{
  this.escapeKey = this.input.keyboard.addKey( Phaser.Keyboard.ESC );
  this.escapeKey.onDown.add( this.escapeButtonDown, this );

  // Buttons.
  GameTitle.activeButton = null;

  this.exitButton = GameTitle.createTextButton( 0, 32,
                                                "Exit", this.returnToMainMenu, this );

  this.exitButton.position.x = this.game.world.width - this.exitButton.width - 16;
  this.exitButton.input.priorityID = 1;

  this.buttonGroup = this.game.add.group();
  this.buttonGroup.add( this.exitButton );
};

GameTitle.Game.prototype.setupGraphics = function()
{
  // All text.
  var allTextGroup = this.game.add.group();
  allTextGroup.add( this.buttonGroup );
  allTextGroup.alpha = 0.0;

  this.game.add.tween( allTextGroup ).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true );

  this.circleSprite = this.createCircleSprite();

  this.game.world.bringToTop( allTextGroup );

  var background = this.game.add.sprite( 0, 0 );
  background.fixedToCamera = true;
  background.scale.setTo( this.game.width, this.game.height );
  background.inputEnabled = true;
  background.input.priorityID = 0;
  background.events.onInputDown.add( this.pointerDown, this );

  this.game.world.sendToBack( background );
};

GameTitle.Game.prototype.setupSounds = function()
{
  this.bell = this.game.add.audio( "bell2" );
  this.soundList.push( this.bell );
};

GameTitle.Game.prototype.update = function()
{
  
};

GameTitle.Game.prototype.escapeButtonDown = function( button )
{
  GameTitle.setActiveButton( this.exitButton );

  this.returnToMainMenu();
};

GameTitle.Game.prototype.pointerDown = function( sprite, pointer )
{
  this.pointer = pointer;
  this.makeImpact( pointer.position );
};

GameTitle.Game.prototype.returnToMainMenu = function()
{
  this.state.start( GameTitle.MainMenu.stateKey );
};

GameTitle.Game.prototype.makeImpact = function( position )
{
  if( !!this.bell._sound )
  {
    this.adjustBellPitch();
  }
  else
  {
    this.bell.onPlay.add( this.adjustBellPitch, this );
  }

  this.bell.play();

  this.resetCircleSprite( this.circleSprite, position );
};

GameTitle.Game.prototype.createCircleSprite = function()
{
  var bmd = this.game.add.bitmapData( 128, 128 );

  bmd.ctx.fillStyle = "#999999";
  bmd.ctx.beginPath();
  bmd.ctx.arc( 64, 64, 64, 0, Math.PI * 2, true ); 
  bmd.ctx.closePath();
  bmd.ctx.fill();

  var sprite = this.game.add.sprite( 0, 0, bmd );
  sprite.anchor.set( 0.5 );

  sprite.alpha = 0.0;

  return sprite;
};

GameTitle.Game.prototype.adjustBellPitch = function()
{
  var verticalScale = 4.0 * ( 1.0 - ( this.pointer.position.y / this.game.world.height ) );
  this.bell._sound.playbackRate.value = verticalScale;
};

GameTitle.Game.prototype.resetCircleSprite = function( circleSprite, position )
{
  circleSprite.position.set( position.x, position.y );

  circleSprite.scale.set( 0.5 );
  circleSprite.alpha = 1.0;

  var verticalScale = ( 1.0 - ( this.pointer.position.y / this.game.world.height ) );
  var colorAdjustment = ( verticalScale * 255 ) | 0;
  
  var r = 255 - colorAdjustment;
  var g = 63;
  var b = 0 + colorAdjustment;

  if( colorAdjustment < 128 )
  {
    g += b;
  }
  else
  {
    g += r;
  }

  circleSprite.tint = ( r << 16 ) + ( g << 8 ) + b;

  this.game.add.tween( circleSprite.scale ).to( { x: 4.0, y: 4.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true );
  this.game.add.tween( circleSprite ).to( { alpha: 0.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true );
};