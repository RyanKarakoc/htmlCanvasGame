import { fetchHighscores } from "../../api.js";

export class Highscores {
  constructor(game) {
    this.game = game;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.highlightedColor = "rgb(0, 150, 255)";
    this.data = [];
    this.start = 0;
    this.end = 5;
    this.maxScores = 5;
    this.getHighscores = true;
    this.onScreenHighscores = [];
    this.highscoreOption = [];
    this.page = 1;
    this.flickerRight = false;
    this.flickerLeft = false;
    this.addEventListener();
  }
  addEventListener() {
    window.addEventListener("keydown", this.keydownHandler);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
  keydownHandler = (e) => {
    if (this.game.screen[0] === "highscores") {
      if (
        e.key === "ArrowRight" &&
        this.page <= this.data.length / this.maxScores
      ) {
        this.page += 1;
        this.highscoreOption[0] = "next";
        this.flickerRight = true;
        setTimeout(() => {
          this.flickerRight = false;
        }, 90);
      } else if (e.key === "ArrowLeft" && this.page > 1) {
        this.page -= 1;
        this.highscoreOption[0] = "back";
        this.flickerLeft = true;
        setTimeout(() => {
          this.flickerLeft = false;
        }, 90);
      } else if (e.key === "ArrowDown") {
        this.highscoreOption[0] = "search";
      } else if (e.key === "Enter") {
        if (this.highscoreOption[0] === "search") {
          this.game.screen[0] = "searchUser";
        }
      } else if (e.key === "Escape") {
        location.reload();
      }
    }
  };
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    context.fillStyle = "rgb(29, 37, 41)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Esc", this.game.width - 50, this.game.height - 450);
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillStyle = "white";
    context.fillText(
      "HIGHSCORES",
      this.game.width * 0.5,
      this.game.height * 0.2
    );
    context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
    this.highscoreOption[0] === "search"
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      "Search Username",
      this.game.width * 0.5,
      this.game.height * 0.9
    );

    if (this.page > 1) {
      context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
      this.flickerLeft
        ? (context.fillStyle = this.highlightedColor)
        : (context.fillStyle = "white");
      context.fillText("⮜", this.game.width * 0.2, this.game.height * 0.6);
    }

    if (this.page <= this.data.length / this.maxScores) {
      context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
      this.flickerRight
        ? (context.fillStyle = this.highlightedColor)
        : (context.fillStyle = "white");
      context.fillText("⮞", this.game.width * 0.8, this.game.height * 0.6);
    }

    if (this.onScreenHighscores.length < 1) {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      context.fillStyle = "white";
      context.fillText(
        "Loading...",
        this.game.width * 0.5,
        this.game.height * 0.4
      );
    } else {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      let yOffset = 0;
      for (let i = 0; i < this.onScreenHighscores.length; i++) {
        context.fillStyle = "yellow";
        context.fillText(
          this.data.indexOf(this.onScreenHighscores[i]) + 1,
          this.game.width * 0.5 - 150,
          this.game.height * 0.4 + yOffset
        );
        context.fillStyle = "white";
        context.fillText(
          this.onScreenHighscores[i][0],
          this.game.width * 0.5,
          this.game.height * 0.4 + yOffset
        );
        context.fillStyle = "lime";
        context.fillText(
          this.onScreenHighscores[i][1],
          this.game.width * 0.5 + 150,
          this.game.height * 0.4 + yOffset
        );
        yOffset += 50;
      }
    }
    context.restore();
  }
  update() {
    if (this.getHighscores) {
      fetchHighscores().then((response) => {
        this.data = response;
      });
      this.getHighscores = false;
    }
    if (this.data.length > 0) {
      this.onScreenHighscores = this.data.slice(this.start, this.end);
    }
    if (this.page > 1) {
      this.onScreenHighscores = this.data.slice(
        this.maxScores * (this.page - 1),
        this.maxScores * this.page
      );
    }
  }
}
