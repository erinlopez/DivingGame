class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
        
	}

    preload(){
        this.load.image('bg1', '/assets/far.png');
        this.load.image('bg2', '/assets/sand.png');
        this.load.image('bg3', '/assets/foreground-1.png')
        this.load.image('bg4', '/assets/foreground-2.png')

        this.load.audio('music', '/assets/watery_cave.mp3')

        this.load.image('play1', '/assets/Default@2x-1.png')
        this.load.image('play2', '/assets/Hover@2x-1.png')
        this.load.image('menu', '/assets/Default.png')
    }
	create() {
        gameState.active = true;
        gameState.cursors = this.input.keyboard.createCursorKeys();

        //add environtment
        this.add.image(0,0, 'bg1').setOrigin(0,0).setScale(2)
        this.add.image(0,0, 'bg2').setOrigin(0,0).setScale(2)
        this.add.image(-25, 150, 'bg3').setOrigin(0, 0).setScale(1.3)
        this.add.image(300, 150, 'bg4').setOrigin(0,0).setScale(1.3)
        
    

        

        //add music
        this.bgMusic = this.sound.add('music', {loop: true});
        this.bgMusic.play();
        this.bgMusic.setVolume(0.1);
        
            //play button
            this.playButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 20, 'play1').setScale(0.3).setInteractive();
            //this.playButton.setTint('0x0000ff')
           
            this.playButton.on('pointerdown', function(){
                this.playButton.setBlendMode(Phaser.BlendModes.MULTIPLY)
                gameState.score = 0;
                var gameScene = this.scene.get('GameScene');
                gameScene.scene.restart();
            })
            
            
            this.playButton.on('pointerup', () => {
               
                
                
                this.scene.switch('GameScene') 
                  
                
                
            })
    
            //menu button
            this.menuButton = this.add.image(473, 6, 'menu').setScale(0.4).setOrigin(0,0).setInteractive();
    
            this.menuButton.on('pointerdown', function(){
                gameState.setBlendMode(Phaser.BlendModes.MULTIPLY)
            })
            
            this.menuButton.on('pointerup', () => {
                gameState.sceneName = 'StartScene'
                this.scene.switch('MenuScene')
            })
  
	}

    update(){
        
    
    }

}