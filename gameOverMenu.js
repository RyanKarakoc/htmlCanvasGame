export class GameOverMenu {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.gameOverOption1 = true;
    this.gameOverOption2 = false;
    this.submit = false;
    this.submitScore = false;
    this.newKey = true;
    this.alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    this.submitScoreOption1 = true;
    this.submitScoreOption2 = false;
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
  update(context) {
    this.newKey = true;
    // submit score -> try again
    if (this.gameOverOption1 && !this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" && !this.submitScore) {
          this.gameOverOption1 = false;
          this.gameOverOption2 = true;
          this.reload = true;
          this.submit = false;
        }
      });
    }
    // try again -> submit score
    if (!this.gameOverOption1 && this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && !this.submitScore) {
          this.gameOverOption1 = true;
          this.gameOverOption2 = false;
          this.reload = false;
          this.submit = true;
        }
      });
    }
    if (this.gameOverOption1 && !this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (
          e.key === " " ||
          (e.key === "Enter" && this.submit && !this.submitScore)
        ) {
          this.submitScore = true;
          this.game.gameOverMenu = false;
        }
      });
    }

    if (!this.gameOverOption1 && this.gameOverOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && this.reload && !this.submitScore) {
          location.reload();
        }
      });
    }

    if (this.submitScore) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          this.submitScoreOption1 = false;
          this.submitScoreOption2 = true;
        }
        if (e.key === "ArrowUp") {
          this.submitScoreOption1 = true;
          this.submitScoreOption2 = false;
        }

        if (this.newKey && e.key === "Backspace") {
          this.game.username.pop();
          this.newKey = false;
        }
        if (
          this.newKey &&
          this.game.username.length < 14 &&
          this.alphabet.includes(e.key) &&
          this.submitScoreOption1
        ) {
          this.game.username.push(e.key);
          this.newKey = false;
        }
      });
    }
  }
  submitScoreScreen(context) {
    context.textAlign = "center";
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillStyle = "rgb(0,0,0, 0.8)";
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
    context.restore();
    context.fillStyle = "black";
    context.strokeRect(250, this.game.height * 0.5 + 20, 400, 80);
    this.submitScoreOption1
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillRect(250, this.game.height * 0.5 + 20, 400, 80);
    context.fillStyle = "white";
    context.fillRect(260, this.game.height * 0.5 + 30, 380, 60);
    context.submitScoreOption1
      ? (context.fillStyle = "black")
      : (context.fillStyle = "white");
    context.strokeRect(260, this.game.height * 0.5 + 30, 380, 60);
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillStyle = this.highlightedColor;
    context.fillText(
      `${this.game.username.join("")}`,
      this.game.width * 0.5,
      this.game.height * 0.65
    );

    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    this.submitScoreOption2
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      "Submit Score",
      this.game.width * 0.5,
      this.game.height * 0.8
    );
    context.restore();
  }
}
