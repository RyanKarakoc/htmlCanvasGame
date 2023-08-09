import { fetchHighscores, fetchHighscoresByUsername } from "../../api.js";

export class Highscores {
  constructor(game, menu) {
    this.game = game;
    this.menu = menu;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.highlightedColor = "rgb(0, 150, 255)";
    this.data = [];
    this.getHighscores = true;
    this.searchUser = true;
    this.fetchUser = true;
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
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Esc", this.game.width - 50, this.game.height - 450);
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillStyle = "white";
    context.fillText(
      "HIGHSCORES",
      this.game.width * 0.5,
      this.game.height * 0.2
    );
    this.searchUser
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
    context.fillText(
      `Search Username: ${this.game.username.join("")}`,
      this.game.width * 0.5,
      this.game.height * 0.3
    );
    if (this.data.length < 1) {
      context.font = this.fontSize * 0.75 + "px " + this.fontFamily;
      context.fillStyle = "white";
      context.fillText(
        "Loading...",
        this.game.width * 0.5,
        this.game.height * 0.4
      );
    } else if (!this.fetchUser) {
      context.fillStyle = "yellow";
      context.fillText(
        `${this.data[0]}`,
        this.game.width * 0.5 - 150,
        this.game.height * 0.4
      );
      context.fillStyle = "white";
      context.fillText(
        `${this.data[1]}`,
        this.game.width * 0.5,
        this.game.height * 0.4
      );
      context.fillStyle = "lime";
      context.fillText(
        `${this.data[1]}`,
        this.game.width * 0.5 + 150,
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
    console.log(this.data.length);
    this.newKey = true;
    this.username = this.game.username.join("");

    if (this.getHighscores) {
      fetchHighscores().then((response) => {
        console.log(response);
        this.data = response;
      });
      this.getHighscores = false;
    }

    if (this.searchUser) {
      console.log(this.game.username.join(""));
      window.addEventListener("keydown", (e) => {
        if (this.newKey && e.key === "Backspace" && this.searchUser) {
          this.game.username.pop();
          this.newKey = false;
        }
        if (
          this.newKey &&
          this.game.username.length < 14 &&
          this.game.alphabet.includes(e.key)
        ) {
          this.game.username.push(e.key);
          this.readyToSubmit = true;
          this.newKey = false;
        }
      });
    }

    if (this.game.screens[0] === "highscoreScreen" && !this.game.play) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && this.fetchUser) {
          fetchHighscoresByUsername(this.game.username.join("")).then(
            (response) => {
              console.log(response);
              this.data = response;
            }
          );
          this.fetchUser = false;
        }
      });
    }

    if (this.game.screens[0] === "highscoreScreen" && !this.game.play) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.game.screens[0] = "mainMenu";
        }
      });
    }
  }
}
