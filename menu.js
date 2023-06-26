export class Menu {
  constructor(game) {
    this.game = game;
    this.arrows = document.getElementById("arrows");
    this.arrows.width = 320;
    this.arrows.height = 320;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.spacebar = document.getElementById("spacebar");
    this.spacebar.width = 361;
    this.spacebar.height = 75;
    this.highlightedColor = "rgb(0, 150, 255)";
    this.controls = false;
    this.menuOption1 = true;
    this.menuOption2 = false;
    this.menuOption3 = false;
    this.clickable = true;
    this.fps = 2;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.highlighted = "controls";
  }
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
    this.menuOption1
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText("CONTROLS", this.game.width * 0.5, this.game.height * 0.5);

    context.textAlign = "center";
    this.menuOption2
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText(
      "HIGHSCORES",
      this.game.width * 0.5,
      this.game.height * 0.6
    );

    context.textAlign = "center";
    this.menuOption3
      ? (context.fillStyle = this.highlightedColor)
      : (context.fillStyle = "white");
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText("PLAY!", this.game.width * 0.5, this.game.height * 0.7);
    context.restore();
  }
  controlScreen(context) {
    context.fillStyle = "rgb(0,0,0,0.8)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillText("CONTROLS", this.game.width * 0.5, this.game.height * 0.3);
    context.fillStyle = "white";
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Back", this.game.width - 50, this.game.height - 450);
    context.drawImage(
      this.arrows,
      this.game.width * 0.02,
      this.game.height * 0.46,
      this.arrows.width,
      this.arrows.height
    );
    context.drawImage(
      this.spacebar,
      this.game.width * 0.55,
      this.game.height * 0.8,
      this.spacebar.width,
      this.spacebar.height
    );
  }
  update() {
    // controlls -> menu
    window.addEventListener("click", (e) => {
      if (e.layerX > 825 && e.layerX < 885 && e.layerY > 35 && e.layerY < 60) {
        this.controls = false;
        this.game.menu = true;
      }
    });
    // controlls -> menu
    window.addEventListener("keydown", (e) => {
      if ((e.key === "Escape" || e.key === "Backspace") && !this.game.play) {
        this.controls = false;
        this.game.menu = true;
      }
    });
    // menu -> controls
    window.addEventListener("click", (e) => {
      if (
        e.layerX > 370 &&
        e.layerX < 540 &&
        e.layerY > 230 &&
        e.layerY < 260
      ) {
        this.controls = true;
        this.game.menu = false;
      }
    });
    // menu -> play
    window.addEventListener("click", (e) => {
      if (
        e.layerX > 405 &&
        e.layerX < 500 &&
        e.layerY > 330 &&
        e.layerY < 360
      ) {
        this.game.menu = false;
        this.game.play = true;
      }
    });
    // highlight controlls -> highscores
    if (this.menuOption1 && !this.menuOption2 && !this.menuOption3) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          this.menuOption1 = false;
          this.menuOption2 = true;
          this.menuOption3 = false;
        }
        if (
          (e.key === " " || e.key === "Enter") &&
          !this.menuOption2 &&
          !this.menuOption3 &&
          !this.game.play
        ) {
          this.controls = true;
          this.game.menu = false;
        }
      });
    }
    // highlight highscores -> play
    if (!this.menuOption1 && this.menuOption2 && !this.menuOption3) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          this.menuOption1 = false;
          this.menuOption2 = false;
          this.menuOption3 = true;
        }
      });
    }
    // highlight play -> highscores
    if (!this.menuOption1 && !this.menuOption2 && this.menuOption3) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
          this.menuOption1 = false;
          this.menuOption2 = true;
          this.menuOption3 = false;
        }
        if (
          (e.key === " " || e.key === "Enter") &&
          !this.menuOption1 &&
          !this.menuOption2
        ) {
          this.game.menu = false;
          this.game.play = true;
        }
      });
    }
    // highlight highscores -> controlls
    if (!this.menuOption1 && this.menuOption2 && !this.menuOption3) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
          this.menuOption1 = true;
          this.menuOption2 = false;
          this.menuOption3 = false;
        }
      });
    }
  }
}
