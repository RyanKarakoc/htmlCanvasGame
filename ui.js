export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
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
    context.fillText("Score: " + this.game.score, 20, 50);
    // timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
    // game over message
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;

      if (this.game.score >= 5) {
        context.fillStyle = "rgb(0,255,0,0.6)";
        context.fillRect(0, 0, this.game.width, this.game.height);
        context.fillStyle = "black";
        context.fillText(
          "Winner!",
          this.game.width * 0.5,
          this.game.height * 0.5
        );
      } else {
        context.fillStyle = "rgb(255,0,0,0.6)";
        context.fillRect(0, 0, this.game.width, this.game.height);
        context.fillStyle = "black";
        context.fillText(
          "Game Over!",
          this.game.width * 0.5,
          this.game.height * 0.5
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillStyle = "black";
        context.fillText(
          "You loose!",
          this.game.width * 0.5,
          this.game.height * 0.5 + 30
        );
      }
    }

    context.restore();
  }
}
