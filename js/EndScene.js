import { convertMinutesSeconds } from './game.js';

export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    init(data) {
        // Pasing your last scene choice into this.choice for the actual scene
        this.score = data.score;
        this.time = data.time;
    }

    /**
     *   Create the game objects (images, groups, sprites and animations).
     */
    create() {
        this.background = this.physics.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.displayWidth = this.game.config.width;
        this.background.displayHeight = this.game.config.height;

        // Create rectangle
        let r1 = this.add.rectangle(
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 4,
            this.game.scale.gameSize.width / 3,
            this.game.scale.gameSize.height / 2.5,
            0xe55c90
        );

        // Add title
        let title = this.add.text(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 4, 'Bravo');
        title.setStyle({ fontSize: 32 });
        title.x = this.game.scale.gameSize.width / 2 - title.width / 2;
        title.y = this.game.scale.gameSize.height / 8;

        // Add score player
        let scoreText = this.add.text(
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 4,
            'Ton score : ' + this.score
        );

        scoreText.setStyle({ fontSize: 32 });
        scoreText.x = this.game.scale.gameSize.width / 2 - scoreText.width / 2;
        scoreText.y = (this.game.scale.gameSize.height * 1.5) / 7;

        // add time player
        let timeText = this.add.text(
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 4,
            'Ton temps : ' + convertMinutesSeconds(this.time)
        );
        timeText.setStyle({ fontSize: 32 });
        timeText.x = this.game.scale.gameSize.width / 2 - timeText.width / 2;
        timeText.y = (this.game.scale.gameSize.height * 2) / 7;

        // Init restart button
        let restartButton = this.add.text(100, 100, 'Rejouer');
        restartButton.setPadding(10);
        restartButton.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        restartButton.setInteractive();
        restartButton.x = this.game.scale.gameSize.width / 2 - restartButton.width / 2;
        restartButton.y = (this.game.scale.gameSize.height * 3) / 5 - restartButton.height / 2;
        // Restart
        restartButton.on('pointerdown', () => {
            this.goToStartScene();
        });
    }

    // /**
    //  * Reset ranges at top
    //  */
    // resetRanges() {
    //     document.getElementById('chronoDisplay').style.width = '0%';
    //     document.getElementById('scoreDisplay').style.width = '0%';
    // }

    /**
     * Go to Start scene
     */
    goToStartScene() {
        this.scene.start('StartScene');
    }
}
