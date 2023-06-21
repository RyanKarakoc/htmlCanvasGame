export class Menu {
  constructor(game) {
    this.game = game;
    this.arrows = document.getElementById("arrows");
    this.arrows.width = 320;
    this.arrows.height = 320;
    this.fontSize = 30;
  }
  draw(context) {
    context.fillStyle = "rgb(0,0,0,0.8)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 2 + "px " + this.fontFamily;
    context.fillText("WELCOME", this.game.width * 0.5, this.game.height * 0.3);

    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText("CONTROLS", this.game.width * 0.5, this.game.height * 0.5);

    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = this.fontSize * 1 + "px " + this.fontFamily;
    context.fillText("PLAY!", this.game.width * 0.5, this.game.height * 0.7);
  }
  controls(context) {
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
      0,
      this.game.height * 0.5,
      this.arrows.width,
      this.arrows.height
    );
  }
}
