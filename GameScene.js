class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameScene'})
    }

    preload(){
        //button
        this.load.image('replay', '/assets/Replay.png')

        //sound
        this.load.audio('coinSound', '/assets/coin.wav');
        this.load.audio('chompSound', '/assets/chomp.wav');
        
        //player
        this.load.spritesheet('player', '/assets/player-swiming.png', {frameWidth: 80, frameHeight: 80})
        this.load.spritesheet('idle', '/assets/player-idle.png', {frameWidth: 80, frameHeight: 80})
        this.load.spritesheet('fast', '/assets/player-fast.png', {frameWidth: 80, frameHeight: 80})
        
        //enemies
        this.load.spritesheet('fish1', '/assets/fish.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('fish2', '/assets/fish-big.png', {frameWidth: 54, frameHeight: 49})
        this.load.spritesheet('fish3', '/assets/fish-dart.png', {frameWidth: 39, frameHeight: 20})

        this.load.spritesheet('crab', '/assets/crab-claws.png', {frameWidth: 32, frameHeight: 32})

        //treasure
        this.load.spritesheet('coin', '/assets/coin-Sheet.png', {frameWidth: 32, frameHeight: 32})
    }

    create(){
        
        
        gameState.active = true;
        gameState.cursors = this.input.keyboard.createCursorKeys();
       
       
        gameState.bg1 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'bg1').setOrigin(0, 0).setScale(2);
        gameState.bg2 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'bg2').setOrigin(0, 0).setScale(2);
        gameState.bg3 = this.add.tileSprite(0, 210, this.game.config.width, this.game.config.height, 'bg3').setOrigin(0,0).setScale(1);
        gameState.bg4 = this.add.tileSprite(0, 210, this.game.config.width, this.game.config.height, 'bg4').setOrigin(0,0).setScale(1);
       
        
        //create fish
        const fish = this.physics.add.group();
        
        const fishList = ['fish1', 'fish2', 'fish3']

        const fishGen = () => {
            const yCoord = Math.random() * 360
            let randomFish = fishList[Math.floor(Math.random() * 3)]
            gameState.fish = fish.create(500, yCoord, randomFish).setVelocityX(-50)
            gameState.fish.flipX = true;
            gameState.fish.body.allowGravity = false
            gameState.fish.anims.play(randomFish, true)  
        }

        const fishGenLoop = this.time.addEvent({
            delay: 4000,
            callback: fishGen,
            callbackScope: this,
            loop: true
        });
        
        for (const f of fishList){
        this.anims.create({
            key: f,
            frames: this.anims.generateFrameNumbers(f, {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        })}

        //create crabs
        const crab = this.physics.add.group();
        this.anims.create({
            key: 'crabWalk',
            frames: this.anims.generateFrameNumbers('crab', {start: 0, end: 6}),
            frameRate: 5,
            repeat: -1
        });

        const crabGen = () => {
            gameState.crab = crab.create(500, 370, 'crab').setScale(1.5).setVelocityX(-50)
            gameState.crab.angle = -90
            gameState.crab.body.allowGravity = false;
            gameState.crab.anims.play('crabWalk', true)
        }
        
        const crabGenLoop = this.time.addEvent({
            delay: 6000,
            callback: crabGen,
            callbackScope: this,
            loop: true
        });

        //create player
        gameState.player = this.physics.add.sprite(50, 100, 'player').setScale(1.5);

        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 7}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 6}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'fast',
            frames: this.anims.generateFrameNumbers('fast', {start: 0, end: 6}),
            frameRate: 5,
            repeat: -1
        });

    
        gameState.player.setCollideWorldBounds(true);
       
       
        //create treasure
        const coin = this.physics.add.group();

        this.anims.create({
            key: 'coinSpin',
            frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 8}),
            frameRate: 5,
            repeat: -1
        });

        const coinGen = () => {
            const xCoord = Math.random() * 360
            const yCoord = Math.random() * 360
            
            gameState.coin = coin.create(xCoord, yCoord, 'coin')
            
            gameState.coin.body.allowGravity = false
            gameState.coin.body.immovable = true;
            gameState.coin.anims.play('coinSpin', true)
            
        }

        const coinGenLoop = this.time.addEvent({
            delay: 4000,
            callback: coinGen,
            callbackScope: this,
            loop: true
        });

        this.coinSound = this.sound.add('coinSound', {loop: false});
        this.coinSound.setVolume(0.4);

        this.chompSound = this.sound.add('chompSound', {loop: false});
        this.chompSound.setVolume(0.4);
       
        var chomps = 0;

        //collision
        gameState.scoreText = this.add.text(10, 10, 'Score: 0', 
        { fontSize: '20px', fill: '#ffffff' });
    
            //player / fish
        this.physics.add.collider(gameState.player, fish, () => {
            coinGenLoop.destroy();
            if (chomps === 0){
            this.chompSound.play();
            chomps += 1;
            }
            this.gameOver()
        })
            //player / crab
        this.physics.add.collider(gameState.player, crab, () => {
            coinGenLoop.destroy();
             
            if (chomps === 0){
                this.chompSound.play();
                chomps += 1;
                }
            this.gameOver()
        })
            //player / coin
        this.physics.add.overlap(gameState.player, coin, (player, coinItem) => {
            this.coinSound.play();
            coinItem.destroy();
            gameState.score += 10;
            gameState.scoreText.setText(`Score: ${gameState.score}`)
                
        }) 
        
         //menu button
         this.menuButton = this.add.image(473, 6, 'menu').setScale(0.4).setOrigin(0,0).setInteractive();

         this.menuButton.on('pointerdown', function(){
             this.setBlendMode(Phaser.BlendModes.MULTIPLY)
         })
         
         this.menuButton.on('pointerup', () => {
             gameState.sceneName = 'GameScene'
             this.scene.switch('MenuScene')
         })


        
  
    }

    gameOver(){
        
        gameState.active = false;
 
        
        this.gameOverText = this.add.text(this.game.config.width / 2 - 90, 150, 'Game Over', 
        {fontSize: '40px', fill: '#ffffff'});


        gameState.player.anims.pause();
        gameState.player.flipY = true;
        
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(-30);
        
        this.replayButton = this.add.image(this.game.config.width / 2, 200, 'replay').setScale(0.4).setOrigin(0,0).setInteractive();

        this.replayButton.on('pointerdown', function(){
            this.setBlendMode(Phaser.BlendModes.MULTIPLY)
            gameState.score = 0;
        })
        this.replayButton.on('pointerup', () => {
            this.scene.restart();
        })
        
       
      
    }

    update(){
        if (gameState.active){

            

            if (gameState.parallax === true){
           
            gameState.bg1.tilePositionX += 0.05;  // slow movement for distant background
            gameState.bg2.tilePositionX += 0.3;  // faster movement for the foreground
            gameState.bg3.tilePositionX += 0.75;  
            gameState.bg4.tilePositionX += 0.75;
            }
            
            gameState.player.body.width = 70;
            gameState.player.body.height = 40;
            
            //player swimming
            if (gameState.cursors.right.isDown){
                gameState.player.setVelocityX(80);
                gameState.player.anims.play('swim', true);
                gameState.player.flipX = false;
                gameState.player.setAngle(0);
                
                if(gameState.cursors.shift.isDown){
                    gameState.player.setVelocityX(200);
                }
                
            }
            else if (gameState.cursors.left.isDown){
                gameState.player.setVelocityX(-80);
                gameState.player.anims.play('swim', true);
                gameState.player.flipX = true;
                gameState.player.setAngle(0);

                if(gameState.cursors.shift.isDown){
                    gameState.player.setVelocityX(-200);
                }
            }
            else if (gameState.cursors.up.isDown){
                gameState.player.setVelocityY(-80);
                gameState.player.anims.play('fast', true);
                gameState.player.flipX = false;
                gameState.player.setAngle(-90);

                gameState.player.body.setOffset(25, 18)
                gameState.player.body.width = 40;
                gameState.player.body.height = 70;

                if(gameState.cursors.shift.isDown){
                    gameState.player.setVelocityY(-200);
                }
            }
            else if (gameState.cursors.down.isDown){
                gameState.player.setVelocityY(80);
                gameState.player.anims.play('fast', true);
                gameState.player.flipX = false;
                gameState.player.setAngle(90);

                gameState.player.body.setOffset(25, 18)
                gameState.player.body.width = 40;
                gameState.player.body.height = 70;

                if(gameState.cursors.shift.isDown){
                    gameState.player.setVelocityY(200);
                }
            } 
            else{
                gameState.player.anims.play('idle', true)
                gameState.player.setVelocity(0);
                gameState.player.setAngle(0);

                gameState.player.body.setOffset(25, 18)
                gameState.player.body.width = 40;
                gameState.player.body.height = 70;
                
            }
        }
    }
}