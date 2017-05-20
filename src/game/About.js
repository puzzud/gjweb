/** @constructor */
GameTitle.About = function(game)
{
  this.menuSystem = new GameTitle.MenuSystem(game, this);

  this.contributorListStyle = {font: "32px Arial", fill: "#ffffff", stroke: "#000000", strokeThickness: 4};
  this.contributorRowList = [];

  this.creditsYPosition = 0;
  this.creditsHeight = 0;
  this.creditsTweenList = [];
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

  this.processContributorList();

  var contributorListLength = 0;
  if(GameTitle.projectInfo !== null &&
      GameTitle.projectInfo.contributors !== undefined)
  {
    contributorListLength = GameTitle.projectInfo.contributors.length;
 }

  var textStartYPosition = this.game.camera.height / 2;
  var buttonStartYPosition = textStartYPosition + (contributorListLength + 1) * 48;
  this.setupInput(buttonStartYPosition);
  this.setupGraphics(textStartYPosition);
};

GameTitle.About.prototype.setupInput = function(textStartYPosition)
{
  this.menuSystem.init();
  this.menuSystem.setBackEvent(this.returnToTitle, this);
  this.menuSystem.enableButtonKeys(true, this);

  // Buttons.
  var backButton = this.menuSystem.addButton(this.game.camera.width / 2, textStartYPosition - ((48 / 2) | 0),
    "Back", this.returnToTitle, this);

  this.menuSystem.setActiveButton(backButton);

  return textStartYPosition + 1 * 48;
};

GameTitle.About.prototype.setupGraphics = function(textStartYPosition)
{
  textStartYPosition = this.setupAuthorText(textStartYPosition);

  GameTitle.setupTitleAndText(this, this.menuSystem);

  return textStartYPosition;
};

GameTitle.About.prototype.escapeKeyDown = function()
{
  this.menuSystem.setActiveButton(this.exitButton);

  this.returnToTitle();
};

GameTitle.About.prototype.returnToTitle = function()
{
  this.state.start(GameTitle.Title.stateKey);
};

GameTitle.About.prototype.processContributorList = function()
{
  if(GameTitle.projectInfo === null ||
      GameTitle.projectInfo.contributors === undefined)
  {
    return;
  }

  var contributorList = GameTitle.projectInfo.contributors;
  contributorList.sort(this.contributorComparator);
};

GameTitle.About.prototype.contributorComparator = function(a, b)
{
  // Sort contributor list by last name, first name, and then contribution.
  
  // Pull first and last names from full name.
  var aContributorName = a.name.split(" ", 2);
  var bContributorName = b.name.split(" ", 2);
  
  var aLastName = (aContributorName[1] === undefined) ? "" : aContributorName[1];
  var bLastName = (bContributorName[1] === undefined) ? "" : bContributorName[1];

  var comparison = strcmp(aLastName, bLastName);
  if(comparison === 0)
  {
    var aFirstName = (aContributorName[0] === undefined) ? "" : aContributorName[0];
    var bFirstName = (bContributorName[0] === undefined) ? "" : bContributorName[0];
  
    comparison = strcmp(aFirstName, bFirstName);
    if(comparison === 0)
    {
      comparison = strcmp(a.contribution, b.contribution);
    }
  }

  return comparison;
};

GameTitle.About.prototype.setupAuthorText = function(textStartYPosition)
{
  this.setupCredits(textStartYPosition);
  
  this.createCreditsScrolling();
  this.resetCreditsScrolling();

  return textStartYPosition + this.creditsHeight;
};

GameTitle.About.prototype.setupCredits = function(textStartYPosition)
{
  this.creditsYPosition = textStartYPosition;

  if(GameTitle.projectInfo === null ||
      GameTitle.projectInfo.contributors === undefined)
  {
    return 0;
  }

  // Create labels and gather total field height.
  var contributorList = GameTitle.projectInfo.contributors;

  // Position the labels based on initial alignment.
  this.contributorRowList.length = 0;

  var gameHorizontalCenter = (this.game.camera.width / 2) | 0;
  var columnOffsetFromCenter = 32;
  var nameColumnXPosition = gameHorizontalCenter - columnOffsetFromCenter;
  var contributionColumnXPosition = gameHorizontalCenter + columnOffsetFromCenter;
  
  var labelYPosition = this.creditsYPosition;
  
  var numberOfContributors = contributorList.length;
  var labelHeight = 48;
  this.creditsHeight = numberOfContributors * labelHeight;
  
  var contributor = null;
  for(var i = 0; i < numberOfContributors; i++)
  {
    contributor = contributorList[i];

    var contributorRow = this.game.add.group();
    contributorRow.position.setTo(0, labelYPosition);
    this.contributorRowList.push(contributorRow);

    var labelName = this.game.add.text(0, 0,
      contributor.name, this.contributorListStyle);

    var nameField = null;
    if(contributor.url !== undefined &&
        contributor.url !== "")
    {
      var urlButton = this.game.add.button(nameColumnXPosition, 0,
        null, this.navigateToContributorUrl, this);

      urlButton.addChild(labelName);
      nameField = urlButton;
   }
    else
    {
      labelName.position.setTo(nameColumnXPosition, 0);
      nameField = labelName;
   }

    labelName.anchor.setTo(1.0, 0.5);
    contributorRow.add(nameField);

    var contributionField = this.game.add.text(contributionColumnXPosition, 0,
      contributor.contribution, this.contributorListStyle);
    contributionField.anchor.setTo(0, 0.5);
    contributionField.tint = 0x888888;
    contributorRow.add(contributionField);

    labelYPosition += labelHeight;
 }
};

GameTitle.About.prototype.createCreditsScrolling = function()
{
  if(GameTitle.projectInfo === null ||
      GameTitle.projectInfo.contributors === undefined)
  {
    return;
 }

  this.resetCreditsScrolling();

  var contributorList = GameTitle.projectInfo.contributors;

  // Set up tweens to scroll and fade credits.
  var labelHeight = 48;
  var scrollDistance = 0;
  var scrollTime = 0;
  var scrollSpeed = 0.025;

  var creditsBelowBottomYPosition = this.creditsYPosition + this.creditsHeight;
  var creditsBottomYPosition = creditsBelowBottomYPosition - labelHeight;
  var creditsAboveTopYPosition = this.creditsYPosition - labelHeight;

  this.creditsTweenList.length = 0;

  for(var i = 0; i < contributorList.length; i++)
  {
    var contributorRow = this.contributorRowList[i];

    var tween = this.game.add.tween(contributorRow);

    scrollDistance = contributorRow.position.y - creditsBottomYPosition;
    scrollTime = (scrollDistance / scrollSpeed) | 0;
    tween.to({alpha: 1.0, y: creditsBottomYPosition},
      scrollTime, Phaser.Easing.Linear.None, false, scrollTime * i);

    scrollDistance = creditsBottomYPosition - this.creditsYPosition;
    scrollTime = (scrollDistance / scrollSpeed) | 0;
    tween.to({y: this.creditsYPosition},
      scrollTime, Phaser.Easing.Linear.None, false);

    scrollDistance = this.creditsYPosition - creditsAboveTopYPosition;
    scrollTime = (scrollDistance / scrollSpeed) | 0;
    tween.to({alpha: 0.0, y: creditsAboveTopYPosition},
      scrollTime, Phaser.Easing.Linear.None, false);
    
    this.creditsTweenList.push(tween);
 }

  // When the last credit goes out of view, restart scrolling.
  var lastTween = this.creditsTweenList[this.creditsTweenList.length - 1];
  if(lastTween !== undefined)
  {
    lastTween.onComplete.add(this.resetCreditsScrolling, this);
 }
};

GameTitle.About.prototype.resetCreditsScrolling = function()
{
  if(GameTitle.projectInfo === null ||
      GameTitle.projectInfo.contributors === undefined)
  {
    return;
 }
  
  var contributorList = GameTitle.projectInfo.contributors;

  var creditsBelowBottomYPosition = this.creditsYPosition + this.creditsHeight;

  // Reset the position of the credits rows.
  for(var i = 0; i < contributorList.length; i++)
  {
    var contributorRow = this.contributorRowList[i];
    
    contributorRow.position.setTo(0, creditsBelowBottomYPosition);
    contributorRow.alpha = 0.0;
 }

  // Start tweens.
  for(var tweenIndex = 0; tweenIndex < this.creditsTweenList.length; tweenIndex++)
  {
    this.creditsTweenList[tweenIndex].start();
 }
};

GameTitle.About.prototype.navigateToContributorUrl = function(button)
{
  var buttonContributorName = button.children[0].text;

  var contributorList = GameTitle.projectInfo.contributors;

  var numberOfContributors = contributorList.length;
  var contributor = null;
  for(var i = 0; i < numberOfContributors; i++)
  {
    contributor = contributorList[i];
    if(buttonContributorName === contributor.name)
    {
      window.location = contributor.url;
      return;
   }
 }

  console.error("Contributor name not found from button press: " + buttonContributorName);
};
