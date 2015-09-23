/** @constructor */
GameTitle.GameLayer3d = function( game )
{
  PhaserThree.Layer3d.call( this, game );

  this.init( game );
};
extend( GameTitle.GameLayer3d, PhaserThree.Layer3d );

GameTitle.GameLayer3d.prototype.init = function( game )
{
  PhaserThree.Layer3d.prototype.init.call( this, game );

  // Camera.
  this.camera.position.set( 0.5, 1.0, 4.5 );

  // Light.
  var ambient = new THREE.AmbientLight( 0xc0c0c0 );
  this.scene.add( ambient );
  
  var light = new THREE.PointLight( 0xcccccc );
  light.position.set( -100.0, 200.0, 100.0 );
  this.scene.add( light );

  // Mesh.
  var geometry = new THREE.BoxGeometry( 1.0, 1.0, 1.0 );
  var material = new THREE.MeshLambertMaterial( { color: 0x9900cc } );
  this.cube = new THREE.Mesh( geometry, material );
  this.scene.add( this.cube );

  this.cube.position.y = 5.5;

  var newY = 2.0 - 0.25;
  var newRotationY = this.cube.rotation.y - 3.5;

  this.game.add.tween( this.cube.position ).to( { y: newY }, 1000, Phaser.Easing.Bounce.Out, true );
  
  var yRotTween = this.game.add.tween( this.cube.rotation );
  yRotTween.to( { y: newRotationY }, 250, Phaser.Easing.Linear.None, true, 300 );
};
