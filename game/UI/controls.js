export class ControlsScreen {
  constructor(game, menu) {
    this.game = game;
    this.menu = menu;
    this.arrows = document.getElementById("arrows");
    this.arrows.width = 320;
    this.arrows.height = 320;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.spacebar = document.getElementById("spacebar");
    this.spacebar.width = 361;
    this.spacebar.height = 75;
    this.highlightedColor = "rgb(0, 150, 255)";
  }
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
    if (this.game.screens[0] === "controlsScreen" && !this.game.play)
      console.log("controls");
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.game.screens[0] = "mainMenu";
      }
    });
  }
}
