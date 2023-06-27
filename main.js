import { Game } from "./game.js";
import { Menu } from "./menu.js";
import { Paused } from "./paused.js";
import { GameOverMenu } from "./gameOverMenu.js";
import { SubmitScore } from "./sumbitScore.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height, canvas);
  const menu = new Menu(game);
  const paused = new Paused(game);
  const submitScore = new SubmitScore(game);
  const gameOverMenu = new GameOverMenu(game);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);

    if (game.menu) {
      menu.draw(context);
      menu.update();
    }

    if (menu.controls) {
      menu.update();
      menu.controlScreen(context);
    }

    if (game.paused && !gameOverMenu.submitScore) {
      paused.draw(context);
      paused.update();
    }

    if (game.gameOverMenu) {
      gameOverMenu.draw(context);
      gameOverMenu.update(context);
    }
    if (gameOverMenu.submitScore) {
      gameOverMenu.update();
      gameOverMenu.submitScoreScreen(context);
    }

    if (!game.gameOver) requestAnimationFrame(animate);

    if (
      !game.menu &&
      !menu.controls &&
      !game.paused &&
      !game.gameOverMenu &&
      !gameOverMenu.submit
    ) {
      game.update(deltaTime);
    }
    console.log(
      gameOverMenu.submitScoreOption1,
      gameOverMenu.submitScoreOption2
    );
  }

  animate(0);
});
