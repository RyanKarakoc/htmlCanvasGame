import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./playerStates.js";

import { CollisionAnimation } from "../collisionAnimation.js";

export class Player {
  constructor(game, detaTime) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrames = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
  }
  update(input, deltaTime) {
    this.checkCollisions();
    this.currentState.handleInput(input);
    // Horizontal movement
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;
    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    // Vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrames) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.gameSpeed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        // collision detected
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2
          )
        );
        if (
          (this.currentState === this.states[4] && this.game.energy) ||
          (this.currentState === this.states[5] && this.game.energy)
        ) {
          this.game.score++;
          this.game.energyX -= 20;
        } else {
          this.setState(6, 0);
          this.game.lives--;
          if (this.game.lives <= 0) {
            this.game.play = false;
            this.game.screen[0] = "gameOver";
          }
        }
      }
    });
  }
}
