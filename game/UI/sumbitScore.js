import { fetchHighscores, postNewHighscore } from "../../api.js";

export class SubmitScore {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.submitScoreOption1 = true;
    this.submitScoreOption2 = false;
    this.username = "";
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
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];
    this.newKey = true;
    this.readyToSubmit = true;
    this.usernameTaken = false;
    this.getHighscores = true;
    this.highscores = [];
  }
  draw(context) {
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
    context.strokeRect(150, this.game.height * 0.5 + 20, 600, 80);
    this.submitScoreOption1
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillRect(150, this.game.height * 0.5 + 20, 600, 80);
    context.fillStyle = "white";
    context.fillRect(160, this.game.height * 0.5 + 30, 580, 60);
    context.submitScoreOption1
      ? (context.fillStyle = "black")
      : (context.fillStyle = "white");
    context.strokeRect(160, this.game.height * 0.5 + 30, 580, 60);
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    if (this.usernameTaken) {
      context.font = this.fontSize * 0.5 + "px " + this.fontFamily;
      context.fillStyle = "red";
      context.fillText(
        "username taken",
        this.game.width * 0.5,
        this.game.height * 0.59
      );
    }
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillStyle = this.highlightedColor;
    context.fillText(
      `username: ${this.game.username.join("")}`,
      this.game.width * 0.5,
      this.game.height * 0.66
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
  update() {
    this.newKey = true;
    this.username = this.game.username.join("");

    if (this.getHighscores) {
      fetchHighscores().then((response) => {
        console.log(response);
        this.highscores = response;
      });
      this.getHighscores = false;
    }
    for (let i = 0; i < this.highscores.length; i++) {
      if (this.highscores[i].includes(this.username)) {
        this.usernameTaken = true;
      }
    }

    if (this.submitScoreOption1 && !this.submitScoreOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          this.submitScoreOption1 = false;
          this.submitScoreOption2 = true;
        }
        if (e.key === "ArrowUp") {
          this.submitScoreOption1 = true;
          this.submitScoreOption2 = false;
        }
        if (this.newKey && e.key === "Backspace" && this.submitScoreOption1) {
          this.game.username.pop();
          this.newKey = false;
          this.usernameTaken = false;
          this.readyToSubmit = true;
        }
        if (
          this.newKey &&
          this.game.username.length < 14 &&
          this.alphabet.includes(e.key) &&
          this.submitScoreOption1
        ) {
          this.game.username.push(e.key);
          this.usernameTaken = false;
          this.readyToSubmit = true;
          this.newKey = false;
        }
      });
    }

    if (
      !this.submitScoreOption1 &&
      this.submitScoreOption2 &&
      !this.usernameTaken
    ) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && this.readyToSubmit) {
          postNewHighscore(this.username, this.game.score);
          console.log("posted");
          this.readyToSubmit = false;
          this.getHighscores = true;
          this.game.screens[0] = "highscoreScreen";
        }
      });
    }
  }
}
