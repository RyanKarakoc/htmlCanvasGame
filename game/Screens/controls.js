export class ControlsScreen {
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
    this.addEventListener();
  }
  addEventListener() {
    window.addEventListener("keydown", this.keydownHandler);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
  keydownHandler = (e) => {
    if (this.game.screen[0] === "controls") {
      if (e.key === "Escape") {
        this.game.screen[0] = "mainMenu";
      }
    }
  };
  draw(context) {
    context.fillStyle = "rgb(0,0,0,0.8)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillText("CONTROLS", this.game.width * 0.5, this.game.height * 0.3);
    context.fillStyle = "white";
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Esc", this.game.width - 50, this.game.height - 450);
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
    this.game.play = false;
  }
}
