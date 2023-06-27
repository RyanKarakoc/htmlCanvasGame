import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./backgound.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./ui.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 45;
    this.gameSpeed = 0;
    this.maxSpeed = 5;
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this);
    this.paused = false;
    this.menu = true;
    this.gameOverMenu = false;
    this.highscores = false;
    this.play = false;
    this.energy = true;
    this.energyX = 0.2;
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.maxParticles = 100;
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.debug = false;
    this.score = 0;
    this.fontColor = "black";
    this.time = 30000;
    this.minTime = 0;
    this.lives = 3;
    this.gameOver = false;
    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();
  }
  update(deltaTime) {
    this.time -= deltaTime;
    if (this.time <= this.minTime) {
      this.gameOverMenu = true;
      this.time = 0;
    }
    this.background.update();
    this.player.update(this.input.keys, deltaTime);
    // handle Enemies
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.markedForDeletion)
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
    });
    // handle particles
    this.particles.forEach((particle, index) => {
      particle.update();
      if (particle.markedForDeletion) this.particles.splice(index, 1);
    });
    if (this.particles.length > this.maxParticles) {
      this.particles = this.particles.slice(0, 50);
    }
    // handle collisions sprites
    this.collisions.forEach((collision, index) => {
      collision.update(deltaTime);
      if (collision.markedForDeletion) {
        this.collisions.splice(index, 1);
      }
    });
    // handle energy
    if (
      this.width * 0.2 - this.energyX >= 179.8 ||
      this.width * 0.2 - this.energyX >= 1.8
    ) {
      this.energy = true;
    } else this.energy = false;
  }
  draw(context, canvas) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
    this.collisions.forEach((collision) => {
      collision.draw(context);
    });
    this.UI.draw(context);
  }
  addEnemy() {
    if (this.gameSpeed > 0 && Math.random() < 0.5) {
      this.enemies.push(new GroundEnemy(this));
    } else if (this.gameSpeed > 0) {
      this.enemies.push(new ClimbingEnemy(this));
    }
    this.enemies.push(new FlyingEnemy(this));
  }
}
