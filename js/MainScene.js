// var good_objects,
//     bad_objects,
//     slashes,
//     line,
//     scoreLabel,
//     score = 0,
//     points = [];

// var fireRate = 1000;
// var nextFire = 0;
let score = 0;
let fruits;
let bombs;
let delay = 10000;
let points = [];
let slashes;
let line;
let contactPoint;
let emitter;
let x, y;

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.spritesheet('fruits', 'assets/fruits-sprite.png', {
            frameWidth: 512,
            frameHeight: 512,
        });

        this.load.spritesheet('divide-fruits', 'assets/fruits-sprite.png', {
            frameWidth: 256,
            frameHeight: 512,
        });
        this.load.image('bomb', 'assets/bomb.png');
        // var bmd = this.add.bitmapData(100, 100);
        // bmd.ctx.fillStyle = '#00ff00';
        // bmd.ctx.arc(50, 50, 50, 0, Math.PI * 2);
        // bmd.ctx.fill();
        // this.cache.addBitmapData('good', bmd);

        // var bmd = this.add.bitmapData(64, 64);
        // bmd.ctx.fillStyle = '#ff0000';
        // bmd.ctx.arc(32, 32, 32, 0, Math.PI * 2);
        // bmd.ctx.fill();
        // this.cache.addBitmapData('bad', bmd);
    }

    create() {
        this.x;
        this.y;
        contactPoint = new Phaser.Geom.Point(0, 0);
        // this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // this.game.physics.arcade.gravity.y = 300;
        this.pointer = this.input.activePointer;
        fruits = this.physics.add.group();
        bombs = this.physics.add.group();
        slashes = this.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa }, fillStyle: { color: 0x0000aa } });
        this.scaleFruit =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.0001
                : this.game.config.width * 0.0002;

        // Init timer for creating fruit
        this.timer = this.time.addEvent({
            delay: delay,
            callback: this.createFruit,
            callbackScope: this,
            loop: true,
            paused: false,
        });
        this.createFruit();
        // slashes = game.add.graphics(0, 0);

        // scoreLabel = game.add.text(10, 10, 'Tip: get the green ones!');
        // scoreLabel.fill = 'white';
        emitter = this.add.particles('divide-fruits');
        emitter.createEmitter({
            frame: 0,
            angle: { min: 180, max: 270 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.game.config.width * 0.0001,
            gravityY: 800,
            on: false,
        });

        emitter.createEmitter({
            frame: 1,
            angle: { min: 270, max: 360 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.game.config.width * 0.0001,
            gravityY: 800,
            on: false,
        });
        // emitter.createEmitter({
        //     frame: 1,
        //     angle: { min: 240, max: 300 },
        //     speed: { min: 200, max: 300 },
        //     quantity: 6,
        //     lifespan: 2000,
        //     alpha: { start: 1, end: 0 },
        //     scale: { start: 1.5, end: 0.5 },
        //     on: false,
        // });
        // emitter.setVelocity(-400, 400);

        // throwObject();
    }

    // createGroup(numItems, sprite) {
    //     var group = game.add.group();
    //     group.enableBody = true;
    //     group.physicsBodyType = Phaser.Physics.ARCADE;
    //     group.createMultiple(numItems, sprite);
    //     group.setAll('checkWorldBounds', true);
    //     group.setAll('outOfBoundsKill', true);
    //     return group;
    // }

    createFruit() {
        var randSpeedX = Phaser.Math.Between(-100, 100);
        var randSpeedY = Phaser.Math.Between(300, 400);
        var c = fruits.create(
            Phaser.Math.Between(0 + 100, this.game.config.width - 100),
            this.game.config.height + this.game.config.height * 0.1,
            'fruits'
        );
        c.setScale(this.scaleFruit).setScrollFactor(0);
        c.setFrame(Phaser.Math.Between(0, 3));
        c.setVelocity(randSpeedX, -randSpeedY);
        c.allowGravity = true;
        c.setGravityY(100);
        c.setInteractive();
        c.body.immovable = true;
    }

    // throwObject() {
    //     if (game.time.now > nextFire && good_objects.countDead() > 0 && bad_objects.countDead() > 0) {
    //         nextFire = game.time.now + fireRate;
    //         throwGoodObject();
    //         if (Math.random() > 0.5) {
    //             throwBadObject();
    //         }
    //     }
    // }

    // throwGoodObject() {
    //     var obj = good_objects.getFirstDead();
    //     obj.reset(game.world.centerX + Math.random() * 100 - Math.random() * 100, 600);
    //     obj.anchor.setTo(0.5, 0.5);
    //     //obj.body.angularAcceleration = 100;
    //     game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 530);
    // }

    // throwBadObject() {
    //     var obj = bad_objects.getFirstDead();
    //     obj.reset(game.world.centerX + Math.random() * 100 - Math.random() * 100, 600);
    //     obj.anchor.setTo(0.5, 0.5);
    //     //obj.body.angularAcceleration = 100;
    //     game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 530);
    // }
    /**
     * Handle collision with a fruit to update the score
     * @param {*} bonhomme  the bonhomme object
     * @param {*} fruit The fruit object
     */
    checkIntersects(fruit, callback) {
        var l1 = new Phaser.Geom.Line(
            fruit.body.right - fruit.width,
            fruit.body.bottom - fruit.height,
            fruit.body.right,
            fruit.body.bottom
        );

        var l2 = new Phaser.Geom.Line(
            fruit.body.right - fruit.width,
            fruit.body.bottom,
            fruit.body.right,
            fruit.body.bottom - fruit.height
        );
        l2.angle = 90;
        console.log('line1 :', l1);
        console.log('line mouve', line);

        if (Phaser.Geom.Intersects.LineToLine(line, l1, true) || Phaser.Geom.Intersects.LineToLine(line, l2, true)) {
            console.log('intersect');
            // contactPoint.x = this.x;
            // contactPoint.y = this.y;
            // var distance = Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y));
            // if (Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y)) > 110) {
            //     return;
            // }
            console.log(fruit);
            if (fruit.texture.key == 'fruits') {
                emitter.emitParticleAt(fruit.x, fruit.y);
                // emitter.gravity = 300;
                // emitter.x = fruit.x;
                // emitter.y = fruit.y;
                // emitter.start(true, 2000, null, 4);
                fruit.destroy();
                points = [];
                score++;
                // scoreLabel.text = 'Score: ' + score;
            } else {
                // resetScore();
                console.log('bomb');
            }
        }
    }

    update() {
        this.input.on('pointermove', function (pointer) {
            x = pointer.x;
            y = pointer.y;
            // this.y = this.game.input.mousePointer.y;
            // slashes.endFill();
        });

        points.push({
            x: x,
            y: y,
        });
        // console.log(this.game.input.mousePointer.x, this.game.input.mousePointer.y);
        points = points.splice(points.length - 10, points.length);
        //game.add.sprite(game.input.x, game.input.y, 'hit');

        if (points.length < 1 || points[0].x == 0) {
            return;
        }
        slashes.clear();
        slashes.fillRect(0xffffff);
        slashes.alpha = 0.5;
        slashes.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            slashes.lineTo(points[i].x, points[i].y);
        }

        for (var i = 1; i < points.length; i++) {
            console.log(points);
            line = new Phaser.Geom.Line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
            fruits.getChildren().forEach(this.checkIntersects);
            // fruits.forEachExists(this.checkIntersects, null);
            bombs.getChildren().forEach(this.checkIntersects);
        }

        //     // if (fruit.body.y > gameHeight + 300) {
        //     //     fruit.destroy();
        //     // }
        // });
        // this.physics.world.collide(this.pointer, fruits, this.collisionHandlerFruit, null, this);
        // throwObject();
        // points.push({
        //     x: game.input.x,
        //     y: game.input.y,
        // });
        // points = points.splice(points.length - 10, points.length);
        // //game.add.sprite(game.input.x, game.input.y, 'hit');
        // if (points.length < 1 || points[0].x == 0) {
        //     return;
        // }
        // slashes.clear();
        // slashes.beginFill(0xffffff);
        // slashes.alpha = 0.5;
        // slashes.moveTo(points[0].x, points[0].y);
        // for (var i = 1; i < points.length; i++) {
        //     slashes.lineTo(points[i].x, points[i].y);
        // }
        // slashes.endFill();
        // for (var i = 1; i < points.length; i++) {
        //     line = new Phaser.Line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
        //     game.debug.geom(line);
        //     good_objects.forEachExists(checkIntersects);
        //     bad_objects.forEachExists(checkIntersects);
        // }
    }

    // checkIntersects(fruit, callback) {
    //     var l1 = new Phaser.Line(
    //         fruit.body.right - fruit.width,
    //         fruit.body.bottom - fruit.height,
    //         fruit.body.right,
    //         fruit.body.bottom
    //     );
    //     var l2 = new Phaser.Line(
    //         fruit.body.right - fruit.width,
    //         fruit.body.bottom,
    //         fruit.body.right,
    //         fruit.body.bottom - fruit.height
    //     );
    //     l2.angle = 90;

    //     if (Phaser.Line.intersects(line, l1, true) || Phaser.Line.intersects(line, l2, true)) {
    //         contactPoint.x = game.input.x;
    //         contactPoint.y = game.input.y;
    //         var distance = Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y));
    //         if (Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y)) > 110) {
    //             return;
    //         }

    //         if (fruit.parent == good_objects) {
    //             killFruit(fruit);
    //         } else {
    //             resetScore();
    //         }
    //     }
    // }

    // resetScore() {
    //     var highscore = Math.max(score, localStorage.getItem('highscore'));
    //     localStorage.setItem('highscore', highscore);

    //     good_objects.forEachExists(killFruit);
    //     bad_objects.forEachExists(killFruit);

    //     score = 0;
    //     scoreLabel.text = 'Game Over!\nHigh Score: ' + highscore;
    //     // Retrieve
    // }

    // render() {}

    // killFruit(fruit) {
    //     emitter.x = fruit.x;
    //     emitter.y = fruit.y;
    //     emitter.start(true, 2000, null, 4);
    //     fruit.kill();
    //     points = [];
    //     score++;
    //     scoreLabel.text = 'Score: ' + score;
    // }
}
