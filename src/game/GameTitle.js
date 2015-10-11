/** @constructor */
GameTitle =
{
  game: null,
  
  title: "Game Title",
  projectWebsite: "https://github.com/puzzud/gjweb",

  screenWidth: 960,
  screenHeight: 540,

  buttonTextColor: 0xffffff,
  buttonTextOverColor: 0xffff00,
  buttonStyle: { font: "32px Arial", fill: "#ffffff" },

  activeButton: null
};

GameTitle.run = function()
{
  this.game = new Phaser.Game( this.screenWidth, this.screenHeight,
                               Phaser.AUTO, "", this );

  this.game.state.add( "Boot", GameTitle.Boot );
  this.game.state.add( "Preloader", GameTitle.Preloader );
  this.game.state.add( "MainMenu", GameTitle.MainMenu );
  this.game.state.add( "Game", GameTitle.Game );

  this.game.state.start( "Boot" );
};

GameTitle.createTextButton = function( x, y, text, callback, callbackContext )
{
  var button = this.game.add.button( x, y, null, callback, callbackContext );
  button.anchor.setTo( 0.5, 0.5 );

  var label = new Phaser.Text( this.game, 0, 0, text, this.buttonStyle );
  label.anchor.setTo( 0.5, 0.5 );

  label.tint = this.buttonTextColor;

  button.addChild( label );

  button.events.onInputOver.add( GameTitle.textButtonOnInputOver, callbackContext );
  button.events.onInputOut.add( GameTitle.textButtonOnInputOut, callbackContext );

  return button;
};

GameTitle.setActiveButton = function( button )
{
  if( GameTitle.activeButton !== null )
  {
    GameTitle.activeButton.children[0].tint = GameTitle.buttonTextColor;
    this.game.add.tween( GameTitle.activeButton.scale ).to( { x: 1.0, y: 1.0 }, 125, Phaser.Easing.Linear.None, true );
  }

  GameTitle.activeButton = button;

  if( button !== null )
  {
    button.children[0].tint = GameTitle.buttonTextOverColor;
    this.game.add.tween( button.scale ).to( { x: 1.125, y: 1.125 }, 125, Phaser.Easing.Linear.None, true );
  }
};

GameTitle.textButtonOnInputOver = function( button, pointer )
{
  GameTitle.setActiveButton( button );
};

GameTitle.textButtonOnInputOut = function( button, pointer )
{
  GameTitle.setActiveButton( null );
};
