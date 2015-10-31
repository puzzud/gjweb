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
  this.contributorRowList = [];
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

  var contributorListLength = 0;
  if( GameTitle.projectInfo !== null &&
      GameTitle.projectInfo.contributors !== undefined )
  {
    contributorListLength = GameTitle.projectInfo.contributors.length;
  }

  var textStartYPosition = this.game.world.centerY;
  var buttonStartYPosition = textStartYPosition + ( contributorListLength + 1 ) * 48;
  this.setupInput( buttonStartYPosition );
  this.setupGraphics( textStartYPosition );
};

GameTitle.About.prototype.setupInput = function( textStartYPosition )
{
  GameTitle.setupButtonKeys( this );

  // Buttons.
  this.exitButton = GameTitle.createTextButton( this.game.world.centerX, textStartYPosition - ( ( 48 / 2 ) | 0 ),
                                                "Back", this.returnToMainMenu, this );

  this.buttonList.length = 0;
  this.buttonList.push( this.exitButton );

  this.buttonGroup = this.game.add.group();
  this.buttonGroup.add( this.exitButton );

  GameTitle.activeButton = null;
  GameTitle.setActiveButton( this.exitButton );

  GameTitle.setupGamepadsForMenu();

  return textStartYPosition + 1 * 48;
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
  if( GameTitle.projectInfo === null ||
      GameTitle.projectInfo.contributors === undefined )
  {
    return 0;
  }

  // Create labels and gather total field height.
  var contributorList = GameTitle.projectInfo.contributors;
  contributorList.sort( GameTitle.contributorComparator );

  // Position the labels based on initial alignment.
  this.contributorRowList.length = 0;

  var gameHorizontalCenter = ( this.game.width / 2 ) | 0;
  var columnOffsetFromCenter = 32;
  var nameColumnXPosition = gameHorizontalCenter - columnOffsetFromCenter;
  var contributionColumnXPosition = gameHorizontalCenter + columnOffsetFromCenter;
  
  var labelYPosition = textStartYPosition;
  
  var numberOfContributors = contributorList.length;
  var labelHeight = 48;
  var contributorFieldHeightTotal = numberOfContributors * labelHeight;
  
  var contributor = null;
  for( var i = 0; i < numberOfContributors; i++ )
  {
    contributor = contributorList[i];

    var contributorRow = this.game.add.group();
    this.contributorRowList.push( contributorRow );

    var labelName = this.game.add.text( 0, 0,
      contributor.name, this.contributorListStyle );

    var nameField = null;
    if( contributor.url !== undefined &&
        contributor.url !== "" )
    {
      var urlButton = this.game.add.button( nameColumnXPosition, labelYPosition,
        null, this.navigateToContributorUrl, this );

      urlButton.addChild( labelName );
      nameField = urlButton;
    }
    else
    {
      labelName.position.setTo( nameColumnXPosition, labelYPosition );
      nameField = labelName;
    }

    labelName.anchor.setTo( 1.0, 0.5 );
    labelName.tint = 0x888888;
    contributorRow.add( nameField );

    var contributionField = this.game.add.text( contributionColumnXPosition, labelYPosition,
      contributor.contribution, this.contributorListStyle );
    contributionField.anchor.setTo( 0, 0.5 );
    contributionField.tint = 0x888888;
    contributorRow.add( contributionField );

    labelYPosition += labelHeight;
  }

  return textStartYPosition + contributorFieldHeightTotal;
};

GameTitle.About.prototype.navigateToContributorUrl = function( button )
{
  var buttonContributorName = button.children[0].text;

  var contributorList = GameTitle.projectInfo.contributors;

  var numberOfContributors = contributorList.length;
  var contributor = null;
  for( var i = 0; i < numberOfContributors; i++ )
  {
    contributor = contributorList[i];
    if( buttonContributorName === contributor.name )
    {
      window.location = contributor.url;
      return;
    }
  }

  console.error( "Contributor name not found from button press: " + buttonContributorName );
};
