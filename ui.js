export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "rgb(0, 150, 255)";
    this.lives = document.getElementById("heart");
  }
  draw(context) {
    // paused
    if (this.game.paused) {
      context.fillStyle = "rgb(0,0,0,0.8)";
      context.fillRect(0, 0, this.game.width, this.game.height);
      context.save();
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.blur = 0;
      context.textAlign = "center";
      context.fillStyle = "rgb(0, 150, 255)";
      context.font = this.fontSize * 3 + "px " + this.fontFamily;
      context.fillText("PAUSED", this.game.width * 0.5, this.game.height * 0.5);
      context.restore();
    }
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.blur = 0;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    //score
    context.fillStyle = "white";
    context.fillText("Score: ", 20, 50);
    context.fillStyle = this.highlightedColor;
    context.fillText(this.game.score, 140, 50);
    // timer
    context.fillStyle = "white";
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: ", 20, 80);
    context.fillStyle = this.highlightedColor;
    context.fillText((this.game.time * 0.001).toFixed(1), 110, 80);
    // hearts
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.lives, 25 * i + 25, 90, 15, 15);
    }
    // energy
    context.fillStyle = "rgb(0,150,255)";
    context.fillRect(
      22,
      110,
      this.game.width * 0.2 - this.game.energyX,
      this.game.height * 0.04
    );
    context.restore();
  }
}
