export class GameOver {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.gameOverOption1 = true;
    this.gameOverOption2 = false;
    this.reload = false;
  }
  draw(context) {
    context.textAlign = "center";
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillStyle = "rgb(0,0,0,0.8)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    context.fillStyle = this.highlightedColor;
    context.fillText(
      "Game Over!",
      this.game.width * 0.5,
      this.game.height * 0.5 - 60
    );
    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    context.fillStyle = "white";
    context.fillText(
      `You Scored       points!`,
      this.game.width * 0.5,
      this.game.height * 0.5 - 10
    );
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillStyle = this.highlightedColor;
    context.fillText(
      `${this.game.score}`,
      this.game.width * 0.5 + 20,
      this.game.height * 0.5 - 5
    );
    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    this.gameOverOption1
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      "Submit Score",
      this.game.width * 0.5,
      this.game.height * 0.5 + 80
    );
    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    this.gameOverOption2
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      "Try Again!",
      this.game.width * 0.5,
      this.game.height * 0.5 + 120
    );
    context.restore();
  }
  update() {
    // submit score -> try again
    if (this.gameOverOption1 && !this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          this.gameOverOption1 = false;
          this.gameOverOption2 = true;
          this.reload = true;
        }
        if (e.key === " " || e.key === "Enter") {
          console.log("hello");
        }
      });
    }
    // try again -> submit score
    if (!this.gameOverOption1 && this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
          this.gameOverOption1 = true;
          this.gameOverOption2 = false;
          this.reload = false;
        }
      });
    }

    if (!this.gameOverOption1 && this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && this.reload) {
          location.reload();
        }
      });
    }

    // try again
    window.addEventListener("click", (e) => {
      if (
        e.layerX > 405 &&
        e.layerX < 505 &&
        e.layerY > 315 &&
        e.layerY < 345
      ) {
        location.reload();
      }
    });
  }
}
