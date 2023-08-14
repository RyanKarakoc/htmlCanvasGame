export class Menu {
  constructor(game) {
    this.game = game;
    this.fontFamily = "Eater";
    this.fontSize = this.fontSize = 30;
    this.highlightedColor = "rgb(0, 150, 255)";
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
  update() {}
}
