export class Menu {
  constructor(game) {
    this.game = game;
    this.arrows = document.getElementById("arrows");
    this.arrows.width = 320;
    this.arrows.height = 320;
    this.fontSize = this.fontSize = 30;
    this.spacebar = document.getElementById("spacebar");
    this.spacebar.width = 361;
    this.spacebar.height = 75;
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
    context.fillText(
      "HIGHSCORES",
      this.game.width * 0.5,
      this.game.height * 0.6
    );

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
}
