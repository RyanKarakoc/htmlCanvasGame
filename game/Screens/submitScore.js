import { fetchHighscores, postNewHighscore } from "../../api.js";
import { GameOverScreen } from "./gameOver.js";

const submitScoreOptions = {
  1: "username",
  2: "submit",
};

export class SubmitScoreScreen {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.submitScoreOption1 = true;
    this.submitScoreOption2 = false;
    this.allData = [];
    this.username = [];
    this.alphabetRegex = /^[a-zA-Z0-9]$/;
    this.getHighscores = true;
    this.usernameTaken = false;
    this.scoreSubmitted = false;
    this.submitScoreOption = submitScoreOptions[1];
    this.addEventListener();
  }

  addEventListener() {
    window.addEventListener("keydown", this.keydownHandler);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.keydownHandler);
  }

  keydownHandler = (e) => {
    if (this.game.screen[0] === "submitScore") {
      if (e.key === "ArrowDown") {
        if (this.submitScoreOption === submitScoreOptions[1]) {
          this.submitScoreOption = submitScoreOptions[2];
        }
      } else if (e.key === "ArrowUp") {
        if (this.submitScoreOption === submitScoreOptions[2]) {
          this.submitScoreOption = submitScoreOptions[1];
        }
      } else if (
        e.key === "Enter" &&
        this.submitScoreOption === submitScoreOptions[2]
      ) {
        if (!this.usernameTaken) {
          postNewHighscore(this.username.join(""), this.game.score).then(
            (response) => {
              console.log(response);
              this.scoreSubmitted = true;
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          );
        }
      } else if (e.key === "Backspace") {
        this.usernameTaken = false;
        this.username.pop();
        this.searchUser = false;
        this.errorMsg = "";
      } else if (
        this.alphabetRegex.test(e.key) &&
        this.submitScoreOption === submitScoreOptions[1]
      ) {
        this.usernameTaken = false;
        this.username.push(e.key);
      } else if (e.key === "Escape") {
        this.username.length = 0;
        this.game.screen[0] = "gameOver";
      }
    }
  };
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
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;

    if (
      this.usernameTaken &&
      this.submitScoreOption === submitScoreOptions[1]
    ) {
      context.font = this.fontSize * 0.5 + "px " + this.fontFamily;
      context.fillStyle = "red";
      context.fillText(
        "username taken",
        this.game.width * 0.5,
        this.game.height * 0.59
      );
    }
    if (this.scoreSubmitted) {
      context.font = this.fontSize * 0.5 + "px " + this.fontFamily;
      context.fillStyle = "green";
      context.fillText(
        "Score Submitted!",
        this.game.width * 0.5,
        this.game.height * 0.59
      );
    }
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    this.submitScoreOption === submitScoreOptions[1]
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.fillText(
      `username: ${this.username.join("")}`,
      this.game.width * 0.5,
      this.game.height * 0.66
    );

    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    this.submitScoreOption === submitScoreOptions[2]
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
    if (this.getHighscores) {
      fetchHighscores().then((response) => {
        this.allData = response;
      });
      this.getHighscores = false;
    }
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].includes(this.username.join(""))) {
        this.usernameTaken = true;
      }
    }
  }
}
