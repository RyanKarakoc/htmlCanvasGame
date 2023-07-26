import { fetchHighscores } from "../../api.js";

export class Highscores {
  constructor(game, menu) {
    this.game = game;
    this.menu = menu;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.data = [];
    // this.data = [
    //   [1, "ryan", 10],
    //   [2, "ryan", 7],
    //   [3, "ryan", 4],
    //   [4, "ryan", 3],
    //   [5, "ryan", 1],
    // ];
    this.getHighscores = true;
  }
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
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillText(
      "HIGHSCORES",
      this.game.width * 0.5,
      this.game.height * 0.2
    );
    if (this.data.length < 1) {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      context.fillText(
        "Loading...",
        this.game.width * 0.5,
        this.game.height * 0.4
      );
    } else {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      let yOffset = 0;
      for (let i = 0; i < this.data.length; i++) {
        context.fillStyle = "yellow";
        context.fillText(
          [i + 1],
          this.game.width * 0.5 - 150,
          this.game.height * 0.4 + yOffset
        );
        context.fillStyle = "white";
        context.fillText(
          this.data[i][0],
          this.game.width * 0.5,
          this.game.height * 0.4 + yOffset
        );
        context.fillStyle = "lime";
        context.fillText(
          this.data[i][1],
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
        console.log(response);
        this.data = response;
      });
      this.getHighscores = false;
    }
    if (this.game.screens[0] === "highscoreScreen" && !this.game.play) {
      console.log("highscore");
      window.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" || e.key === "Escape") {
          this.game.screens[0] = "mainMenu";
        }
      });
    }
  }
}
