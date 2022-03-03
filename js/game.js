import MainScene from './MainScene.js';

/**
 * Configuration of the game
 */
const configurations = {
    type: Phaser.AUTO,
    backgroundColor: '#F6F6F6',
    parent: 'fruitNinja',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'fruitNinja',
        width: window.innerWidth,
        height: window.innerHeight,
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debut: true,
        },
    },
    scene: [MainScene],
};

/**
 * The main controller for the entire Phaser game.
 * @name game
 * @type {object}
 */
let game = new Phaser.Game(configurations);
