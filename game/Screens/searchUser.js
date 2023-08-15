import { fetchHighscores, fetchHighscoresByUsername } from "../../api.js";
import { Highscores } from "./highscores.js";

export class SearchUser {
  constructor(game) {
    this.game = game;
    this.highscores = new Highscores(game);
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.highlightedColor = "rgb(0, 150, 255)";
    this.getHighscores = true;
    this.allData = [];
    this.data = [];
    this.getHighscore = true;
    this.username = [];
    this.errorMsg = "";
    this.rank = 0;
    this.alphabetRegex = /[a-zA-Z]/;
    this.searchUser = false;
    this.addEventListener();
  }
  addEventListener() {
    window.addEventListener("keydown", this.keydownHandler);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
  keydownHandler = (e) => {
    if (this.game.screen[0] === "searchUser") {
      if (e.key === "ArrowDown") {
      } else if (e.key === "ArrowUp") {
      } else if (e.key === "Enter") {
        fetchHighscoresByUsername(this.username.join("")).then((response) => {
          if (!Array.isArray(response)) {
            this.errorMsg = response.msg;
          }

          this.data = response;
          this.searchUser = true;
        });
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i][0] === this.username.join("")) {
            this.rank = i + 1;
          }
        }
      } else if (e.key === "Escape") {
        this.game.screen[0] = "highscores";
      } else if (e.key === "Backspace") {
        this.username.pop();
        this.newKey = false;
        this.searchUser = false;
        this.errorMsg = "";
      } else if (this.alphabetRegex.test(e.key)) {
        this.username.push(e.key);
        this.newKey = false;
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
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillStyle = this.highlightedColor;
    context.fillText(
      `Type Username: ${this.username.join("")}`,
      this.game.width * 0.5,
      this.game.height * 0.35
    );
    context.font = this.fontSize * 0.65 + "px " + this.fontFamily;
    context.fillStyle = "yellow";
    context.fillText(
      "rank",
      this.game.width * 0.5 - 150,
      this.game.height * 0.45
    );
    context.fillStyle = "white";
    context.fillText(
      "Username",
      this.game.width * 0.5,
      this.game.height * 0.45
    );
    context.fillStyle = "green";
    context.fillText(
      "score",
      this.game.width * 0.5 + 150,
      this.game.height * 0.45
    );
    if (this.errorMsg) {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      context.fillStyle = "red";
      context.fillText(
        `${this.errorMsg}`,
        this.game.width * 0.5,
        this.game.height * 0.55
      );
    } else if (this.searchUser) {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      context.fillStyle = "yellow";
      context.fillText(
        `${this.rank}`,
        this.game.width * 0.5 - 150,
        this.game.height * 0.55
      );
      context.fillStyle = "white";
      context.fillText(
        `${this.data[1]}`,
        this.game.width * 0.5,
        this.game.height * 0.55
      );
      context.fillStyle = "green";
      context.fillText(
        `${this.data[2]}`,
        this.game.width * 0.5 + 150,
        this.game.height * 0.55
      );
    }
  }
  update() {
    if (this.getHighscores) {
      fetchHighscores().then((response) => {
        this.allData = response;
      });
      this.getHighscores = false;
    }
  }
}
