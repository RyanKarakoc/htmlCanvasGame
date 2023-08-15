const gameOverOptions = {
  1: "Submit Score",
  2: "Try Again",
};

export class GameOverScreen {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.gameOverOption = gameOverOptions[1];
    this.addEventListener();
  }
  addEventListener() {
    window.addEventListener("keydown", this.keydownHandler);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.keydownHandler);
  }

  keydownHandler = (e) => {
    if (this.game.screen[0] === "gameOver") {
      if (e.key === "ArrowDown") {
        if (this.gameOverOption === gameOverOptions[1]) {
          this.gameOverOption = gameOverOptions[2];
        }
      } else if (e.key === "ArrowUp") {
        if (this.gameOverOption === gameOverOptions[2]) {
          this.gameOverOption = gameOverOptions[1];
        }
      } else if (e.key === "Enter") {
        if (this.gameOverOption === gameOverOptions[1]) {
          this.game.screen[0] = "submitScore";
        } else if (this.gameOverOption === gameOverOptions[2]) {
          location.reload();
        }
      }
    }
  };

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
    this.gameOverOption === gameOverOptions[1]
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      "Submit Score",
      this.game.width * 0.5,
      this.game.height * 0.5 + 80
    );
    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    this.gameOverOption === gameOverOptions[2]
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      "Try Again!",
      this.game.width * 0.5,
      this.game.height * 0.5 + 120
    );
    context.restore();
  }
  update() {}
}
