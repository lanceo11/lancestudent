---
layout: base
title: Background with Object
description: Use JavaScript to have an in motion background.
sprite: images/platformer/sprites/flying-ufo.png
background: images/platformer/backgrounds/alien_planet2.jpg
permalink: /background
---

<!-- Display area -->
<canvas id="world"></canvas>

<script>
  // Gives elements
  const canvas = document.getElementById("world");
  const ctx = canvas.getContext('2d');
  
  // Create graphics as images
  const backgroundImg = new Image();
  const spriteImg = new Image();
  
  // Assigns images to have roles
  backgroundImg.src = '{{page.background}}';
  spriteImg.src = '{{page.sprite}}';

  // Number of games loaded and starting value
  let imagesLoaded = 0;
  
  
  backgroundImg.onload = function() {
    imagesLoaded++;
    startGameWorld();
  };
  
  // Appears when game is loaded
  spriteImg.onload = function() {
    imagesLoaded++;
    startGameWorld();
  };
  // This starts the game
  function startGameWorld() {
    // Limits the game start until loaded
    if (imagesLoaded < 2) return;

    // Gives objects their different sizings
    class GameObject {
      constructor(image, width, height, x = 0, y = 0, speedRatio = 0) {
        this.image = image;           // Image parameters
        this.width = width;           // Width for image
        this.height = height;         // Height for image
        this.x = x;                   // X position
        this.y = y;                   // Y position
        this.speedRatio = speedRatio; 
        this.speed = GameWorld.gameSpeed * this.speedRatio; // Movement speed
      }
      
    
      update() {}
      
      // Draws the object based on position
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

   
    class Background extends GameObject {
      constructor(image, gameWorld) {
        
        super(image, gameWorld.width, gameWorld.height, 0, 0, 0.1);
      }
      
      
      update() {
        this.x = (this.x - this.speed) % this.width;
      }
      
  
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    }

    
    class Player extends GameObject {
      constructor(image, gameWorld) {
       
        const width = image.naturalWidth / 2;
        const height = image.naturalHeight / 2;
        
       
        const x = (gameWorld.width - width) / 2;
        const y = (gameWorld.height - height) / 2;
        
       
        super(image, width, height, x, y);
        
        this.baseY = y;    
        this.frame = 0;    
      }
      
      
      update() {
        
        this.y = this.baseY + Math.sin(this.frame * 0.1) * 50;
        this.frame++; // 
      }
    }

    
    class GameWorld {
      static gameSpeed = 5; // Sets the speed of the object
      
      constructor(backgroundImg, spriteImg) {
        
        this.canvas = document.getElementById("world");
        this.ctx = this.canvas.getContext('2d');
        
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
       
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `0px`;
        this.canvas.style.top = `${(window.innerHeight - this.height) / 2}px`;

        // Organizes background and sprite images
        this.objects = [
         new Background(backgroundImg, this), 
         new Player(spriteImg, this)          
        ];
      }
      
      // Game loop to run
      gameLoop() {
        // Clears page
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Updates each object and draws them
        for (const obj of this.objects) {
          obj.update();        // Updates object
          obj.draw(this.ctx);  // Draws object
        }
        
     
        requestAnimationFrame(this.gameLoop.bind(this));
      }
      
      // Game loop starts it
      start() {
        this.gameLoop();
      }
    }

    // New game world created when activated
    const world = new GameWorld(backgroundImg, spriteImg);
    world.start();
  }
</script>