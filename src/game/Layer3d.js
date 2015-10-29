PhaserThree = {};

/** @constructor */
PhaserThree.Layer3d = function( game )
{
  this.init( game );
};

PhaserThree.Layer3d.prototype.init = function( game )
{
  this.game = game;

  // Renderer.
  this.renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  this.renderer.setSize( game.width, game.height );

  // Canvas.
  this.canvas = this.renderer.domElement;

  // Scene.
  this.scene = new THREE.Scene();
  this.renderer.setClearColor( 0x000000, 0 );

  // Camera.
  this.camera = new THREE.PerspectiveCamera( 45, this.game.width / this.game.height, 0.1, 20000 );
  this.camera.position.set( 0.0, 0.0, 0.0 );
  this.camera.lookAt( new THREE.Vector3( 0.0, 0.0, 0.0 ) );
  this.scene.add( this.camera );

  // Sprite from Canvas.
  this.baseTexture = new PIXI.BaseTexture( this.canvas );
  this.texture = new PIXI.Texture( this.baseTexture );
  this.textureFrame = new Phaser.Frame( 0, 0, 0, this.game.width, this.game.height, "debug", game.rnd.uuid() );
  this.sprite = this.game.add.sprite( 0, 0, this.texture, this.textureFrame );
  this.sprite.fixedToCamera = true;
};

PhaserThree.Layer3d.prototype.update = function()
{
  this.scene.position.x = -this.game.camera.position.x * 2;
  this.scene.position.y = -this.game.camera.position.y * 2;

  this.renderer.render( this.scene, this.camera );

  if( this.game.renderer.updateTexture !== undefined )
  {
    this.game.renderer.updateTexture( this.baseTexture );
  }
};
