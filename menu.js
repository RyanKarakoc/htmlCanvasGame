export class Menu {
  constructor(game) {
    this.game = game;
    this.buttons = document.getElementById("buttons");
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
  }
}
