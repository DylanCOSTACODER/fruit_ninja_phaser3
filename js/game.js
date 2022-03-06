import EndScene from './EndScene.js';
import MainScene from './MainScene.js';
import StartScene from './StartScene.js';

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
    scene: [StartScene, MainScene, EndScene],
};

/**
 * The main controller for the entire Phaser game.
 * @name game
 * @type {object}
 */
let game = new Phaser.Game(configurations);

export function convertMinutesSeconds(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? 'm' : 'm0') + s;
}
