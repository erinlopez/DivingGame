var gameState = {
    score: 0
};

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 400,
    backgroundColor: "3E79DD",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 20},
            enableBody: true
        }
    
    },
    scene: [StartScene, MenuScene, GameScene]
};

const game = new Phaser.Game(config)
