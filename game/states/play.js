'use strict';

var Ground    = require('../prefabs/ground');
var Tank      = require('../prefabs/tank');
var Crosshair = require('../prefabs/crosshair');
var Enemy     = require('../prefabs/enemy');
var MovingEnemy     = require('../prefabs/movingEnemy');
var StationaryShooter     = require('../prefabs/stationary_shooter');
var HealthPickup     = require('../prefabs/health_pickup');
var Castle    = require('../prefabs/castle');

function Play() {}
Play.prototype = {
  create: function() {

    // Setup gravity
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 1200;
    this.game.physics.p2.restitution = 0.3;
    this.game.physics.p2.friction = 0.3;
    //this.game.physics.p2.setImpactEvents(true);

    // Set up collision groups
    this.playerCG = this.game.physics.p2.createCollisionGroup();
    this.environmentCG = this.game.physics.p2.createCollisionGroup();
    this.enemyCG = this.game.physics.p2.createCollisionGroup();

    // background
    this.background = this.game.add.tileSprite(0, 0, 5000, 500, 'background');
    this.flowers = this.game.add.sprite(0, this.game.height - 120, 'flowers');

    // Create/add the ground
    this.ground = new Ground(this.game, 0, 500, 10000, 40);
    this.game.add.existing(this.ground);
    //this.ground.body.setCollisionGroup(this.groundCG);

    // Create the tank
    this.tank = new Tank(this.game, this.game.width/8, this.game.height/2);
    //this.tank.body.setCollisionGroup(this.entityCG);
    this.game.add.existing(this.tank);

    // Create the crosshair
    this.crosshair = new Crosshair(this.game, this.game.width/2, this.game.height/2);
    this.game.add.existing(this.crosshair);
    this.tank.crosshair = this.crosshair;

    // Create/add a enemy

    // this.enemy = new Enemy(this.game, 600, 300);
    // this.game.add.existing(this.enemy);

    //moving enemy
    // this.movingEnemy = new MovingEnemy(this.game, 800, 300, 200);
    // this.game.add.existing(this.movingEnemy);

    this.healthPickup = new HealthPickup(this.game, 400, 300,1);
    this.game.add.existing(this.healthPickup);

    // var stationaryEnemy = new StationaryShooter(this.game, 1200, 300);
    // stationaryEnemy.target = this.tank;
    // this.game.add.existing(stationaryEnemy);

    // var wall = this.game.add.sprite(300, 250, 'brickWall');
    // this.game.physics.p2.enable(wall);
    // wall.body.mass = 10;

    this.castle = new Castle(this.game, 900, 330);
    this.game.add.existing(this.castle);

    // Camera
    this.game.camera.follow(this.tank, Phaser.Camera.FOLLOW_PLATFORMER);

    // World bounds
    this.game.world.setBounds(0, 0, 5000, 500);

    // Capture the spacebar key so the page doesn't scroll
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  },
  update: function() {
    if(this.tank.health <= 0) {
      this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
        this.game.state.start('gameover', true, false, false);
      }, this);

    }
    if(this.tank.world.x > 4500)
      this.game.state.start('level_manager', true, false, true);
  }
};

module.exports = Play;
