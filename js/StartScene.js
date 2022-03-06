export default class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.image('background', 'assets/fruit-ninja_background.png');
    }

    /**
     * Create the game objects (images, groups, sprites and animations).
     */
    create() {
        this.background = this.physics.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.displayWidth = this.game.config.width;
        this.background.displayHeight = this.game.config.height;
        var width = document.getElementById('fruitNinja').clientWidth;
        var height = document.getElementById('fruitNinja').clientHeight;

        this.game.scale.setGameSize(width, height);

        // Init text title menu
        this.titleMenu = this.add.text(this.game.scale.gameSize.width / 2, 100, 'Fruit Ninja', {
            fontSize: '40px',
            fill: '#000',
        });

        this.titleMenu.x = this.game.scale.gameSize.width / 2 - this.titleMenu.width / 2;
        this.titleMenu.y = (this.game.scale.gameSize.height * 0.5) / 4;

        // Init ballon chase button
        let normalModeButton = this.add.text(100, 100, 'Mode normal');
        normalModeButton.setPadding(10);
        normalModeButton.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        normalModeButton.setInteractive();
        normalModeButton.x = this.game.scale.gameSize.width / 2 - normalModeButton.width / 2;
        normalModeButton.y = this.game.scale.gameSize.height / 4 - normalModeButton.height / 2;

        // Init color chase button
        let dojoModeButton = this.add.text(100, 100, 'Mode Dojo');
        dojoModeButton.setPadding(10);
        dojoModeButton.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        dojoModeButton.setInteractive();
        dojoModeButton.x = this.game.scale.gameSize.width / 2 - dojoModeButton.width / 2;
        dojoModeButton.y = (this.game.scale.gameSize.height * 1.5) / 4 - dojoModeButton.height / 2;

        // Manage mode choice
        normalModeButton.on('pointerdown', () => {
            this.goToMainScene('normal');
        });
        dojoModeButton.on('pointerdown', () => {
            this.goToMainScene('dojo');
        });
    }

    /**
     * Go to Main scene
     */
    goToMainScene(choice) {
        this.scene.start('MainScene', { choice: choice });
    }
}
