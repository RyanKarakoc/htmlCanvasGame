export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "red";
    this.lives = document.getElementById("heart");
  }
  draw(context) {
    // paused
    if (this.game.paused) {
      context.fillStyle = "rgb(255,255,255,0.6)";
      context.fillRect(0, 0, this.game.width, this.game.height);
      context.textAlign = "center";
      context.fillStyle = "black";
      context.font = this.fontSize * 3 + "px " + this.fontFamily;
      context.fillText("PAUSED", this.game.width * 0.5, this.game.height * 0.5);
    }
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.blur = 0;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    //score
    context.fillStyle = "black";
    context.fillText("Score: ", 20, 50);
    context.fillStyle = this.highlightedColor;
    context.fillText(this.game.score, 140, 50);
    // timer
    context.fillStyle = "black";
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: ", 20, 80);
    context.fillStyle = this.highlightedColor;
    context.fillText((this.game.time * 0.001).toFixed(1), 110, 80);
    // hearts
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.lives, 22 * i + 22, 90, 15, 15);
    }
    context.restore();
  }
}
