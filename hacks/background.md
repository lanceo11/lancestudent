---
layout: default
title: Background with Object
description: Use JavaScript to have an in motion background.
sprite: images/platformer/sprites/flying-ufo.png
background: images/platformer/backgrounds/alien_planet1.jpg
permalink: /background
---

<!-- Canvas element that will serve as the game world display area -->
<canvas id="world"></canvas>

<script>
  // Get canvas element and 2D rendering context for drawing
  const canvas = document.getElementById("world");
  const ctx = canvas.getContext('2d');
  
  // Create Image objects for background and sprite graphics
  const backgroundImg = new Image();
  const spriteImg = new Image();
  
  // Jekyll assignment of Images - uses Jekyll template variables from front matter
  backgroundImg.src = '{{page.background}}';
  spriteImg.src = '{{page.sprite}}';

  // Track how many images have finished loading (need both before starting game)
  let imagesLoaded = 0;
  
  // Event handler for when background image finishes loading
  backgroundImg.onload = function() {
    imagesLoaded++;
    startGameWorld();
  };
  
  // Event handler for when sprite image finishes loading
  spriteImg.onload = function() {
    imagesLoaded++;
    startGameWorld();
  };
  /* This block starts the game
   * It checks for all images being loaded before starting
  */
  // Function that initializes the game world once all images are loaded
  function startGameWorld() {
    // Don't start until both images are loaded
    if (imagesLoaded < 2) return;

    // Base class for all game objects (background, player, etc.)
    class GameObject {
      constructor(image, width, height, x = 0, y = 0, speedRatio = 0) {
        this.image = image;           // Image to draw for this object
        this.width = width;           // Width to draw the image
        this.height = height;         // Height to draw the image
        this.x = x;                   // X position on canvas
        this.y = y;                   // Y position on canvas
        this.speedRatio = speedRatio; // Speed multiplier relative to game speed
        this.speed = GameWorld.gameSpeed * this.speedRatio; // Actual movement speed
      }
      
      // Update method to be overridden by subclasses for object-specific logic
      update() {}
      
      // Draw the object on the canvas at its current position
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

    // Background class that creates a scrolling background effect
    class Background extends GameObject {
      constructor(image, gameWorld) {
        // Fill entire canvas with background, slow speed ratio for parallax effect
        super(image, gameWorld.width, gameWorld.height, 0, 0, 0.1);
      }
      
      // Move background left and wrap around when it goes off screen
      update() {
        this.x = (this.x - this.speed) % this.width;
      }
      
      // Draw two copies of background side by side for seamless scrolling
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    }

    // Player class that represents the main character/sprite
    class Player extends GameObject {
      constructor(image, gameWorld) {
        // Scale sprite to half its natural size
        const width = image.naturalWidth / 2;
        const height = image.naturalHeight / 2;
        
        // Center the player on the screen
        const x = (gameWorld.width - width) / 2;
        const y = (gameWorld.height - height) / 2;
        
        // No speed ratio - player doesn't move horizontally
        super(image, width, height, x, y);
        
        this.baseY = y;    // Store original Y position for floating animation
        this.frame = 0;    // Animation frame counter
      }
      
      // Create floating/bobbing animation using sine wave
      update() {
        // Oscillate up and down around base position
        this.y = this.baseY + Math.sin(this.frame * 0.1) * 50;
        this.frame++; // Increment frame for continuous animation
      }
    }

    // Main game world class that manages the entire game
    class GameWorld {
      static gameSpeed = 5; // Global game speed setting
      
      constructor(backgroundImg, spriteImg) {
        // Get canvas and context references
        this.canvas = document.getElementById("world");
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to full window dimensions
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Style canvas to fill viewport and position absolutely
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `0px`;
        this.canvas.style.top = `${(window.innerHeight - this.height) / 2}px`;

        // Create array of all game objects (background first, then player)
        this.objects = [
         new Background(backgroundImg, this), // Background renders first (behind player)
         new Player(spriteImg, this)          // Player renders second (in front of background)
        ];
      }
      
      // Main game loop that runs every frame
      gameLoop() {
        // Clear the entire canvas for fresh drawing
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw each game object
        for (const obj of this.objects) {
          obj.update();        // Update object state/position
          obj.draw(this.ctx);  // Draw object on canvas
        }
        
        // Schedule next frame using browser's animation timing
        requestAnimationFrame(this.gameLoop.bind(this));
      }
      
      // Start the game by beginning the game loop
      start() {
        this.gameLoop();
      }
    }

    // Create new game world instance with loaded images and start the game
    const world = new GameWorld(backgroundImg, spriteImg);
    world.start();
  }
</script>