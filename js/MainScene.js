// var good_objects,
//     bad_objects,
//     slashes,
//     line,
//     scoreLabel,
//     score = 0,
//     points = [];

// var fireRate = 1000;
// var nextFire = 0;
let score;
let lifes = 3;
let scoreText, lifeText, timeDojoText;
let fruits, chrono, lifesLosts;
let bombs;
let isBomb;
let delay = 5000;
let delayBomb = 10000;
let dojoTime = 30;
let points = [];
let line, slashSound, endSound;
let speed = 1.3;
let numberOfFruit = 1,
    numberOfBomb = 1;
let emitterBanana = null,
    emitterAnana = null,
    emitterCherry = null,
    emitterStrawberry = null,
    emitterLine = null,
    emitterBomb = null,
    emitterApple = null,
    particleLine = null,
    choice = null;
let x, y;

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    init(data) {
        // Pasing your last scene choice into choice for the actual scene
        choice = data.choice;
    }

    preload() {
        // this.load.spritesheet('fruits', 'assets/fruits-sprite.png', {
        //     frameWidth: 512,
        //     frameHeight: 512,
        // });

        this.load.spritesheet('banana', 'assets/Banana_Spritesheet.png', {
            frameWidth: 715,
            frameHeight: 292,
        });

        this.load.spritesheet('cherry', 'assets/Cherry_Spritesheet.png', {
            frameWidth: 327,
            frameHeight: 292,
        });

        this.load.spritesheet('pineapple', 'assets/Pineapple_Spritesheet2.png', {
            frameWidth: 150,
            frameHeight: 294,
        });

        this.load.spritesheet('apple', 'assets/Apple_SpriteSheet.png', {
            frameWidth: 359,
            frameHeight: 292,
        });

        this.load.spritesheet('strawberry', 'assets/Strawberry_Spritesheet.png', {
            frameWidth: 254,
            frameHeight: 292,
        });

        // this.load.spritesheet('divide-fruits', 'assets/fruits-sprite.png', {
        //     frameWidth: 256,
        //     frameHeight: 512,
        // });

        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('line', 'assets/line.png');
        this.load.audio('slash', ['assets/slash.wav']);
        this.load.audio('endSound', ['assets/end_sound.wav']);
    }

    create() {
        this.x;
        this.y;
        this.background = this.physics.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.displayWidth = this.game.config.width;
        this.background.displayHeight = this.game.config.height;
        // Init Sounds
        slashSound = this.sound.add('slash');
        endSound = this.sound.add('endSound');

        // Init fruit and bombs
        fruits = this.physics.add.group();
        bombs = this.physics.add.group();

        this.resetValues();

        this.scaleFruit =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.0002
                : this.game.config.width * 0.0004;

        this.scaleAnana =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.0003
                : this.game.config.width * 0.0006;

        this.scaleApple =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.0002
                : this.game.config.width * 0.0004;
        this.scaleBanana =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.00012
                : this.game.config.width * 0.00024;
        this.scaleCherry =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.0002
                : this.game.config.width * 0.0004;
        this.scaleStrawberry =
            this.game.config.width > this.game.config.height
                ? this.game.config.width * 0.0002
                : this.game.config.width * 0.0004;

        this.fruitScore = this.add.sprite(this.game.config.width * 0.05, this.game.config.height * 0.05, 'fruits');
        this.fruitScore.setFrame(0);
        this.fruitScore.setScale(this.scaleFruit);

        scoreText = this.add.text(this.game.config.width * 0.08, this.game.config.height * 0.05, '', {
            font: '32px Press Start 2P',
        });
        scoreText.text = 'Score : ' + score;

        if (choice == 'normal') {
            lifeText = this.add.text(
                this.game.config.width - this.game.config.width * 0.08,
                this.game.config.height * 0.05,
                '',
                {
                    font: '32px Press Start 2P',
                }
            );
            lifeText.text = 'Vies : ' + lifes;
        } else if (choice == 'dojo') {
            delay = 1000;
            delayBomb = 1000;
            timeDojoText = this.add.text(
                this.game.config.width - this.game.config.width * 0.08,
                this.game.config.height * 0.05,
                '',
                {
                    font: '32px Press Start 2P',
                }
            );
            timeDojoText.text = 'Time : ' + dojoTime;
        }

        // Init timer for creating fruit
        this.timerFruit = this.time.addEvent({
            delay: delay,
            callback: this.createFruit,
            callbackScope: this,
            loop: true,
            paused: false,
        });

        // Instantiate chrono
        this.timerBomb = this.time.addEvent({
            delay: delayBomb,
            callback: this.createBomb,
            callbackScope: this,
            loop: true,
        });

        // Instantiate chrono
        this.timer2 = this.time.addEvent({
            delay: 1000,
            callback: this.generalCounter,
            callbackScope: this,
            loop: true,
        });

        // Create first fruit
        this.createFruit();

        particleLine = this.add.particles('line');
        emitterLine = particleLine.createEmitter({
            x: -400,
            y: 300,
            speed: 300,
            scale: 0.5,
            quantity: 1,
            alpha: { start: 3, end: 0 },
            blendMode: 'SCREEN',
            lifespan: 100,
        });
        emitterLine.reserve(1000);
        // emitterLine.stop();

        emitterBanana = this.add.particles('banana');
        emitterBanana.createEmitter({
            frame: 1,
            angle: { min: 180, max: 270 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleBanana,
            gravityY: 800,
            on: false,
        });

        emitterBanana.createEmitter({
            frame: 2,
            angle: { min: 270, max: 360 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleBanana,
            gravityY: 800,
            on: false,
        });

        emitterCherry = this.add.particles('cherry');
        emitterCherry.createEmitter({
            frame: 1,
            angle: { min: 180, max: 270 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleCherry,
            gravityY: 800,
            on: false,
        });

        emitterCherry.createEmitter({
            frame: 2,
            angle: { min: 270, max: 360 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleCherry,
            gravityY: 800,
            on: false,
        });

        emitterAnana = this.add.particles('pineapple');
        emitterAnana.createEmitter({
            frame: 1,
            angle: { min: 180, max: 270 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleAnana,
            gravityY: 800,
            on: false,
        });

        emitterAnana.createEmitter({
            frame: 2,
            angle: { min: 270, max: 360 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleAnana,
            gravityY: 800,
            on: false,
        });

        emitterStrawberry = this.add.particles('strawberry');
        emitterStrawberry.createEmitter({
            frame: 1,
            angle: { min: 180, max: 270 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleStrawberry,
            gravityY: 800,
            on: false,
        });

        emitterStrawberry.createEmitter({
            frame: 2,
            angle: { min: 270, max: 360 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleStrawberry,
            gravityY: 800,
            on: false,
        });

        emitterApple = this.add.particles('apple');
        emitterApple.createEmitter({
            frame: 1,
            angle: { min: 180, max: 270 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleApple,
            gravityY: 800,
            on: false,
        });

        emitterApple.createEmitter({
            frame: 2,
            angle: { min: 270, max: 360 },
            speed: { min: 400, max: 600 },
            quantity: 1,
            lifespan: 4000,
            scale: this.scaleApple,
            gravityY: 800,
            on: false,
        });

        // Update pointer value
        this.input.on('pointermove', function (pointer) {
            x = pointer.x;
            y = pointer.y;
            emitterLine.start();
            emitterLine.setPosition(x, y);
        });

        this.input.on('pointerup', function () {
            emitterLine.stop();
        });
    }

    /**
     * Chrono manager
     */
    generalCounter() {
        chrono++;
        if (choice == 'dojo') {
            timeDojoText.text = 'Time : ' + (dojoTime - chrono);
        }
    }

    /**Reset players values */
    resetValues() {
        // number of fruits
        numberOfFruit = 1;
        // number of bombs
        numberOfBomb = 1;
        // delay
        delay = 5000;
        // delay bomb reset
        delayBomb = 10000;
        // If is bomb
        isBomb = false;
        // Life losts
        lifesLosts = 0;
        // Instantiate score and display
        score = 0;
        // Instantiate chrono and display
        chrono = 0;
    }

    createFruit() {
        const keySelection = ['cherry', 'pineapple', 'strawberry', 'apple', 'banana'];

        for (let i = 0; i < numberOfFruit; i++) {
            let scale;
            var randSpeedX = Phaser.Math.Between(0, 100) * speed;
            var randSpeedY = Phaser.Math.Between(500, 600) * speed;
            var randowXpos = Phaser.Math.Between(0 + 100, this.game.config.width - 100);
            var c = fruits.create(
                randowXpos,
                this.game.config.height + this.game.config.height * 0.1,
                keySelection[Phaser.Math.Between(0, 4)]
            );
            console.log(c.texture.key);
            switch (c.texture.key) {
                case 'banana':
                    scale = this.scaleBanana;
                    break;
                case 'cherry':
                    scale = this.scaleCherry;
                    break;
                case 'pineapple':
                    scale = this.scaleAnana;
                    break;
                case 'strawberry':
                    scale = this.scaleStrawberry;
                    break;
                case 'apple':
                    scale = this.scaleApple;
                    break;
            }
            c.setScale(scale).setScrollFactor(0);
            c.setFrame(0);
            c.setVelocity(c.body.x > this.game.config.width / 2 ? -randSpeedX : randSpeedX, -randSpeedY);
            c.allowGravity = true;
            c.setGravityY(300);
            c.setInteractive();
            c.body.immovable = true;
        }
    }

    createBomb() {
        for (let i = 0; i < numberOfBomb; i++) {
            var randSpeedX = Phaser.Math.Between(0, 100) * speed;
            var randSpeedY = Phaser.Math.Between(500, 600) * speed;
            var randowXpos = Phaser.Math.Between(0 + 100, this.game.config.width - 100);
            var c = bombs.create(randowXpos, this.game.config.height + this.game.config.height * 0.1, 'bomb');
            c.setScale(this.scaleFruit).setScrollFactor(0);
            c.setVelocity(c.body.x > this.game.config.width / 2 ? -randSpeedX : randSpeedX, -randSpeedY);
            c.allowGravity = true;
            c.setGravityY(300);
            c.setInteractive();
            c.body.immovable = true;
        }
    }

    /**
     * Handle collision with a fruit to update the score
     * @param {*} fruit The fruit object
     */
    checkIntersects(fruit, callback) {
        var l1 = new Phaser.Geom.Line(
            fruit.body.right - fruit.body.width,
            fruit.body.bottom - fruit.body.height,
            fruit.body.right,
            fruit.body.bottom
        );
        var l2 = new Phaser.Geom.Line(
            fruit.body.right - fruit.body.width,
            fruit.body.bottom,
            fruit.body.right,
            fruit.body.bottom - fruit.body.height
        );
        l2.angle = 90;

        if (Phaser.Geom.Intersects.LineToLine(line, l1, true) || Phaser.Geom.Intersects.LineToLine(line, l2, true)) {
            if (
                (fruit.texture.key == 'cherry') |
                (fruit.texture.key == 'pineapple') |
                (fruit.texture.key == 'strawberry') |
                (fruit.texture.key == 'apple') |
                (fruit.texture.key == 'banana')
            ) {
                switch (fruit.texture.key) {
                    case 'banana':
                        emitterBanana.emitParticleAt(fruit.x, fruit.y);
                        break;
                    case 'cherry':
                        emitterCherry.emitParticleAt(fruit.x, fruit.y);
                        break;
                    case 'pineapple':
                        emitterAnana.emitParticleAt(fruit.x, fruit.y);
                        break;
                    case 'strawberry':
                        emitterStrawberry.emitParticleAt(fruit.x, fruit.y);
                        break;
                    case 'apple':
                        emitterApple.emitParticleAt(fruit.x, fruit.y);
                        break;
                }

                slashSound.play();
                points = [];
                score++;
                scoreText.text = 'Score : ' + score;
                if (score % 5 == 0 && choice == 'normal') {
                    delay = delay - 100;
                    numberOfFruit = numberOfFruit + 1;
                }
                if (choice == 'dojo') {
                    if (score % 10 == 0) {
                        numberOfFruit = numberOfFruit + 1;
                    }

                    if (score % 15 == 0) {
                        numberOfBomb = numberOfBomb + 1;
                    }
                }
            } else {
                isBomb = true;
            }
            fruit.destroy();
        }
    }

    update() {
        // Push new points in points table
        points.push({
            x: x,
            y: y,
        });

        // remove last points
        points = points.splice(points.length - 10, points.length);

        for (var i = 1; i < points.length; i++) {
            line = new Phaser.Geom.Line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
            fruits.getChildren().forEach(this.checkIntersects);
            bombs.getChildren().forEach(this.checkIntersects);
        }

        fruits.getChildren().forEach(function (fruit) {
            if (fruit.body.y > this.game.config.height + this.game.config.height * 0.1) {
                if (choice == 'normal') {
                    lifesLosts++;
                    lifeText.text = 'Vies : ' + (lifes - lifesLosts);
                }
                fruit.destroy();
            }
        }, this);

        bombs.getChildren().forEach(function (bomb) {
            if (bomb.body.y > this.game.config.height + this.game.config.height * 0.1) {
                bomb.destroy();
            }
            if (bomb.body) {
                emitterBomb = particleLine.createEmitter({
                    speed: { min: 100, max: 200 },
                    angle: { min: -85, max: -95 },
                    scale: { start: 0, end: 1, ease: 'Back.easeOut' },
                    alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
                    blendMode: 'SCREEN',
                    lifespan: 500,
                    follow: bomb,
                });
            }
        }, this);

        // Check if is game over
        this.gameOver();
    }

    /**
     * Go to end scene and reset game value if condition are required
     */
    gameOver() {
        if ((choice == 'normal' && lifes <= lifesLosts) || isBomb || (choice == 'dojo' && chrono == 30)) {
            endSound.play();
            this.goToEndScene();
            this.resetValues();
        }
    }

    /**
     * Go back to endScene
     */
    goToEndScene() {
        this.scene.start('EndScene', { score: score, time: chrono });
    }
}
