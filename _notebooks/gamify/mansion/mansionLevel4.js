// To build GameLevels, each contains GameObjects from below imports
import GameEnvBackground from './GameEngine/GameEnvBackground.js';
import Player from './GameEngine/Player.js';

class MansionLevel4 {
  constructor(gameEnv) {
	let width = gameEnv.innerWidth;
	let height = gameEnv.innerHeight;
	let path = gameEnv.path;

	// Background data
	const image_background = path + "/images/mansionGame/image_lvl4.png"; // be sure to include the path
	const image_data_background = {
		name: 'background',
		greeting: "This is the casino, you will try to gamble your way out of the level, survive as long as possible.",
		src: image_background,
		pixels: {height: 1280, width: 720}
	};

	
	const sprite_src_mc = path + "/images/gamify/spookMcWalk.png"; // be sure to include the path
	const MC_SCALE_FACTOR = 6;
	const sprite_data_chillguy = {
		id: 'Spook',
		greeting: "Hi, I am Spook.",
		src: sprite_src_mc,
		SCALE_FACTOR: MC_SCALE_FACTOR,
		STEP_FACTOR: 800,
		ANIMATION_RATE: 10,
		INIT_POSITION: { x: (width / 2 - width / (5 * MC_SCALE_FACTOR)), y: height - (height / MC_SCALE_FACTOR)},
		pixels: {height: 2400, width: 3600},
		orientation: {rows: 2, columns: 3},
		down: {row: 1, start: 0, columns: 3},
		downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16},
		downLeft: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16},
		left: {row: 0, start: 0, columns: 3},
		right: {row: 1, start: 0, columns: 3},
		up: {row: 1, start: 0, columns: 3},
		upLeft: {row: 0, start: 0, columns: 3, rotate: Math.PI/16},
		upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16},
		hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
	// Use WASD keys (matches other levels). If you want arrow-keys too, update Player to accept arrays.
	keypress: { up: 87, left: 65, down: 83, right: 68 } // W,A,S,D
	};

		// List of objects defnitions for this level
		this.classes = [
			{ class: GameEnvBackground, data: image_data_background },
			// Use the MobilePlayer subclass so mobile users get an on-screen D-pad
			{ class: MobilePlayer, data: sprite_data_chillguy },
		];
  }

  		// collision function
	class Barrier
	{
		constructor(data)
		{
			this.x = data.x;
			this.y = data.y;
			this.width = data.width;
			this.height = data.height;
			this.color = data.color | | 'rgba(255,0,0,0.3)';
			this.visible = data.visible !== undefined? data.visible : false;
		}

		draw() {
			if (!this.visible) return;

			const ctx = GameEnvBackground.ctx;
			ctx.fillStyle = this.color;
			ctx.fillRect (this.x, this.y, this.width, this.height);
		
			ctx.strokeStyle = 'rgba(225, 0, 0, 0.8)';
			ctx.lineWidth = 2;
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		}

		checkCollision(player) {
			const playerHitbox = player.getHitbox();
			return !(
				playerHitbox.x > this.x + this.width ||
				playerHitbox.x + playerHitbox.width < this.x ||
				playerHitbox.y > this.y + this.height ||
				playerHitbox.y + playerHitbox.height < this.y

	// Barrier Locations

	const barrierData = [
		// Outer walls
		{ x: 0, y: 0, width: width, height: 40 }, // Top wall
		{ x: 0, y: height - 40, width: width, height: 40 }, // Bottom wall
		{ x: 0, y: 0, width: 40, height: height }, // Left wall
		{ x: width - 40, y: 0, width: 40, height: height }, // Right wall
	
		// Blackjack Tables
		{ x: width * 0.05, y: height * 0.12, width: width * 0.18, height: height * 0.15 },
		{ x: width * 0.77, y: height * 0.12, width: width * 0.18, height: height * 0.15 },
	
		// Slot Machines
		{ x: width * 0.02, y: height * 0.35, width: width * 0.08, height: height * 0.12 },
		{ x: width * 0.05, y: height * 0.65, width: width * 0.18, height: height * 0.18 },
		{ x: width * 0.02, y: height * 0.88, width: width * 0.06, height: height * 0.08 },
		{ x: width * 0.28, y: height * 0.52, width: width * 0.14, height: height * 0.15 },
		{ x: width * 0.58, y: height * 0.52, width: width * 0.14, height: height * 0.15 },
		{ x: width * 0.90, y: height * 0.35, width: width * 0.08, height: height * 0.12 },
		{ x: width * 0.77, y: height * 0.65, width: width * 0.18, height: height * 0.18 },
		{ x: width * 0.92, y: height * 0.88, width: width * 0.06, height: height * 0.08 },
		{ x: width * 0.12, y: height * 0.38, width: width * 0.06, height: height * 0.08 },
      	{ x: width * 0.82, y: height * 0.38, width: width * 0.06, height: height * 0.08 },
      	{ x: width * 0.46, y: height * 0.02, width: width * 0.08, height: height * 0.05 },
      	{ x: width * 0.45, y: height * 0.45, width: width * 0.10, height: height * 0.08 },
      	{ x: width * 0.05, y: height * 0.28, width: width * 0.18, height: height * 0.05 },
      	{ x: width * 0.77, y: height * 0.28, width: width * 0.18, height: height * 0.05 },
      	{ x: width * 0.02, y: height * 0.02, width: width * 0.06, height: height * 0.08 },
      	{ x: width * 0.92, y: height * 0.02, width: width * 0.06, height: height * 0.08 },
    ];
	this.classes = [
      { class: GameEnvBackground, data: image_data_background },
      { class: Player, data: sprite_data_chillguy },
      ...barrier_data.map(data => ({ class: Barrier, data }))
    ];
  }
  	checkCollisions(player, barriers) {
		for (let barrier of barriers) {
			if (barrier.checkCollision(player)) {
				const overlapLeft = (player.x + player.width) - barrier.x;
				const overlapRight = (barrier.x + barrier.width) - player.x;
				const overlapTop = (player.y + player.height) - barrier.y;
				const overlapBottom = (barrier.y + barrier.height) - player.y;

				const minOverlapX = Math.min(overlapLeft, overlapRight);
				const minOverlapY = Math.min(overlapTop, overlapBottom);

				if (minOverlapX < minOverlapY) {
					// Horizontal collision
					if (overlapLeft < overlapRight) {
						// Collision from left
						player.x -= overlapLeft;
					} else {
						// Collision from right
						player.x += overlapRight;
					}
				} else {
					// Vertical collision
					if (overlapTop < overlapBottom) {
						// Collision from top
						player.y -= overlapTop;
					} else {
						// Collision from bottom
						player.y += overlapBottom;

					player.velocity = { x: 0, y: 0 }; // Disables Movement
					return true;
					}
				}
			}
		}
		return false;
	}

			);
		}
	}
}



export default MansionLevel4