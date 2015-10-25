/** @constructor */
GameTitle.About = function( game )
{
  this.cursorKeys = null;
  this.spaceBar = null;
  this.enterKey = null;

  this.buttonList = [];
  this.exitButton = null;
  this.buttonGroup = null;

  this.contributorListStyle = { font: "32px Arial", fill: "#ffffff" };
};

GameTitle.About.stateKey = "About";

GameTitle.About.prototype.init = function()
{
  
};

GameTitle.About.prototype.preload = function()
{
  
};

GameTitle.About.prototype.create = function()
{
  this.stage.backgroundColor = 0x444444; 

  var textStartYPosition = this.game.world.centerY;
  var buttonStartYPosition = textStartYPosition + ( GameTitle.contributorList.length + 1 ) * 48;
  this.setupInput( buttonStartYPosition );
  this.setupGraphics( textStartYPosition );
};

GameTitle.About.prototype.setupInput = function( textStartYPosition )
{
  GameTitle.setupButtonKeys( this );

  // Buttons.
  this.exitButton = GameTitle.createTextButton( this.game.world.centerX, textStartYPosition + 0 * 48,
                                                "Back", this.returnToMainMenu, this );

  this.buttonList.length = 0;
  this.buttonList.push( this.exitButton );

  this.buttonGroup = this.game.add.group();
  this.buttonGroup.add( this.exitButton );

  GameTitle.activeButton = null;
  GameTitle.setActiveButton( this.exitButton );

  return textStartYPosition + 1 * 48;

  GameTitle.setupGamepadsForMenu();
};

GameTitle.About.prototype.setupGraphics = function( textStartYPosition )
{
  textStartYPosition = this.setupAuthorText( textStartYPosition );

  GameTitle.setupTitleAndText( this );

  return textStartYPosition;
};

GameTitle.About.prototype.returnToMainMenu = function()
{
  this.state.start( GameTitle.MainMenu.stateKey );
};

GameTitle.About.prototype.setupAuthorText = function( textStartYPosition )
{
  var contributorList = GameTitle.contributorList;
  contributorList.sort( GameTitle.contributorComparator );

  var contributor = null;
  var contributorName = "";
  var label = null;

  var numberOfContributors = contributorList.length;
  for( var i = 0; i < numberOfContributors; i++ )
  {  
    contributor = contributorList[i];

    contributorName = contributor.firstName + " " + contributor.lastName +
      " " + "(" + contributor.contribution + ")";

    label = this.game.add.text( this.game.world.centerX, textStartYPosition,
                                contributorName, this.contributorListStyle );
    label.anchor.setTo( 0.5, 0.5 );

    label.tint = 0x8888bb;

    textStartYPosition += 48;
  }

  return textStartYPosition;
};
