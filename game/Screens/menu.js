import { ControlsScreen } from "./controls.js";

export class MainMenu {
  constructor(game) {
    this.game = game;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.highlightedColor = "rgb(0, 150, 255)";
    this.clickable = true;
    this.fps = 2;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.menuOption = ["controls"];
    this.navigation = false;
    this.addEventListener();
  }
  addEventListener() {
    window.addEventListener("keydown", this.keydownHandler);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
  keydownHandler = (e) => {
    if (this.game.screen[0] === "mainMenu") {
      if (e.key === "ArrowDown") {
        if (this.menuOption[0] === "controls") {
          this.menuOption[0] = "highscores";
        } else if (this.menuOption[0] === "highscores") {
          this.menuOption[0] = "play";
        }
      } else if (e.key === "ArrowUp") {
        if (this.menuOption[0] === "highscores") {
          this.menuOption[0] = "controls";
        } else if (this.menuOption[0] === "play") {
          this.menuOption[0] = "highscores";
        }
      } else if (e.key === "Enter") {
        if (this.menuOption[0] === "controls") {
          this.game.screen[0] = "controls";
        } else if (this.menuOption[0] === "highscores") {
          this.game.screen[0] = "highscores";
        }
      }
    }
  };

  draw(context) {
    context.fillStyle = "rgb(0,0,0,0.8)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillText("WELCOME", this.game.width * 0.5, this.game.height * 0.3);

    context.textAlign = "center";
    this.menuOption[0] === "controls" || this.menuOption.length === 0
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText("CONTROLS", this.game.width * 0.5, this.game.height * 0.5);

    context.textAlign = "center";
    this.menuOption[0] === "highscores"
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText(
      "HIGHSCORES",
      this.game.width * 0.5,
      this.game.height * 0.6
    );

    context.textAlign = "center";
    this.menuOption[0] === "play"
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText("PLAY!", this.game.width * 0.5, this.game.height * 0.7);
    context.restore();
  }
  update(context) {
    this.game.play = false;
  }
}
