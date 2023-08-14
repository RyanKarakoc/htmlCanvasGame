export class Paused {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.lives = document.getElementById("heart");
    this.pausedOption1 = true;
    this.pausedOption2 = false;
    this.return = false;
    this.restart = false;
  }
  draw(context) {
    context.fillStyle = "rgb(0,0,0,0.5)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 3 + "px " + this.fontFamily;
    context.fillText("PAUSED", this.game.width * 0.5, this.game.height * 0.4);
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    this.pausedOption1
      ? (context.fillStyle = "rgb(0, 150, 255)")
      : (context.fillStyle = "white");
    context.fillText("Return", this.game.width * 0.5, this.game.height * 0.6);
    this.pausedOption2
      ? (context.fillStyle = "rgb(0, 150, 255)")
      : (context.fillStyle = "white");
    context.fillText("Restart", this.game.width * 0.5, this.game.height * 0.7);
    context.restore();
  }

  update() {
    this.game.paused = true;
    if (this.pausedOption1 && !this.pausedOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          this.pausedOption1 = false;
          this.pausedOption2 = true;
        }
        if (
          (e.key === "Enter" || e.key === " ") &&
          this.pausedOption1 &&
          !this.pausedOption2
        ) {
          this.game.paused = false;
        }
      });
    }

    if (!this.pausedOption1 && this.pausedOption2) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
          this.pausedOption1 = true;
          this.pausedOption2 = false;
        }
        if (
          (e.key === "Enter" || e.key === " ") &&
          !this.pausedOption1 &&
          this.pausedOption2
        ) {
          location.reload();
        }
      });
    }
  }
}
