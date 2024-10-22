class MenuScene extends Phaser.Scene{
    constructor(){
        super({key: 'MenuScene'})
    }

    preload(){
        //load buttons
        this.load.image('soundOn', '/assets/SoundOn.png');
        this.load.image('soundOff', '/assets/SoundOff.png');
        
        this.load.image('home', '/assets/Home.png');

        this.load.image('arrow', '/assets/Arrow.png');
    }
    create(){
        //set environment
        this.add.image(0,0, 'bg1').setOrigin(0,0).setScale(2);
        this.add.image(0,0, 'bg2').setOrigin(0,0).setScale(2);
        this.add.image(-25, 150, 'bg3').setOrigin(0, 0).setScale(1.3)
        this.add.image(300, 150, 'bg4').setOrigin(0,0).setScale(1.3)
        this.add.text(this.game.config.width / 2 - 25 , 100, 'Menu', {fill: '#ffffff', fontSize: '30px'}).setOrigin(0,0)
		
       
        this.scrollButton = this.add.image(346, 150, 'arrow').setScale(0.4).setOrigin(0,0).setInteractive();
 
        //menu button -> return to previous scene
        this.menuButton = this.add.image(473, 6, 'menu').setScale(0.4).setOrigin(0,0).setInteractive();

        this.menuButton.on('pointerdown', function(){
            this.setBlendMode(Phaser.BlendModes.MULTIPLY)
        })
        this.menuButton.on('pointerup', () => {
            
            //this.setBlendMode(Phaser.BlendModes.NORMAL)
            this.scene.switch(gameState.sceneName)
        })
        
        //home button -> return to start scene
        this.homeButton = this.add.image(this.game.config.width / 2 - 10, 150, 'home').setScale(0.4).setOrigin(0,0).setInteractive();
 
        this.homeButton.on('pointerdown', function(){
            this.homeButton.setBlendMode(Phaser.BlendModes.MULTIPLY)
        })
        this.homeButton.on('pointerup', () => {
            
            this.scene.switch('StartScene')
        })
      

        
        
    }  
    
    update(){
         
         
 
         
 
        //sound button
        if (game.sound.mute === false){
            this.soundOnButton = this.add.image(146, 150, 'soundOn').setScale(0.4).setOrigin(0,0).setInteractive();
            this.soundOnButton.on('pointerdown', function(){
                game.sound.mute = true;
            })
        }
        else if (game.sound.mute === true){
            this.soundOffButton = this.add.image(146, 150, 'soundOff').setScale(0.4).setOrigin(0,0).setInteractive();
            this.soundOffButton.on('pointerdown', function(){
                game.sound.mute = false;
            })
        }

       
        
        this.scrollButton.on('pointerdown', function(){
            this.setBlendMode(Phaser.BlendModes.MULTIPLY)
        })
        this.scrollButton.on('pointerup', () => {
            gameState.parallax = true;
            
        })

        if (gameState.parallax === true){
            
            this.scrollButton.on('pointerdown', function(){
                this.setBlendMode(Phaser.BlendModes.NORMAL)
            })
            this.scrollButton.on('pointerup', () => {
                gameState.parallax = false;
                

            })
        }
        
       
    }
}

