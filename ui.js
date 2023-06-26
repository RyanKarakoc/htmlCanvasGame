export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Eater";
    this.highlightedColor = "red";
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

    context.restore();

    // game over message
    // if (this.game.gameOver) {
    //   context.textAlign = "center";
    //   context.font = this.fontSize * 2 + "px " + this.fontFamily;

    //   context.fillStyle = "rgb(0,0,0,0.8)";
    //   context.fillRect(0, 0, this.game.width, this.game.height);
    //   context.fillStyle = this.highlightedColor;
    //   context.fillText(
    //     "Game Over!",
    //     this.game.width * 0.5,
    //     this.game.height * 0.5 - 60
    //   );
    //   context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    //   context.fillStyle = "white";
    //   context.fillText(
    //     `You Scored       points!`,
    //     this.game.width * 0.5,
    //     this.game.height * 0.5
    //   );
    //   context.font = this.fontSize * 1 + "px " + this.fontFamily;
    //   context.fillStyle = this.highlightedColor;
    //   context.fillText(
    //     `${this.game.score}`,
    //     this.game.width * 0.5 + 20,
    //     this.game.height * 0.5
    //   );
    //   context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    //   context.fillStyle = "white";
    //   context.fillText(
    //     "Submit Score",
    //     this.game.width * 0.5,
    //     this.game.height * 0.5 + 40
    //   );
    //   context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    //   context.fillStyle = "white";
    //   context.fillText(
    //     "Try Again!",
    //     this.game.width * 0.5,
    //     this.game.height * 0.5 + 80
    //   );
    // }
  }
}
