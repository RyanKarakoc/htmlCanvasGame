import { Game } from "./game/game.js";
import { Menu } from "./game/UI/menu.js";
import { Paused } from "./game/UI/paused.js";
import { GameOverMenu } from "./game/UI/gameOverMenu.js";
import { SubmitScore } from "./game/UI/sumbitScore.js";
import { Highscores } from "./game/UI/highscores.js";
import { ControlsScreen } from "./game/UI/controls.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height, canvas);
  const menu = new Menu(game);
  const controlScreen = new ControlsScreen(game, menu);
  const highscores = new Highscores(game, menu);
  const paused = new Paused(game);
  const submitScore = new SubmitScore(game);
  const gameOverMenu = new GameOverMenu(game);

  const screens = [];
  let lastTime = 0;

  function animate(timeStamp) {
    console.log(game.screens, game.paused);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);

    if (game.screens[0] === "mainMenu" && !game.play) {
      menu.draw(context);
      menu.update();
    }

    if (game.screens[0] === "controlsScreen" && !game.play) {
      controlScreen.draw(context);
      controlScreen.update();
    }

    if (game.screens[0] === "highscoreScreen" && !game.play) {
      highscores.draw(context);
      highscores.update(context);
    }

    if (game.screens[0] === "gameOverScreen") {
      gameOverMenu.draw(context);
      gameOverMenu.update(context);
    }

    if (game.screens[0] === "submitScoreScreen") {
      submitScore.draw(context);
      submitScore.update();
    }

    if (game.paused) {
      paused.draw(context);
      paused.update();
    }

    if (!game.gameOver) requestAnimationFrame(animate);

    if (game.play && !game.paused) {
      game.update(deltaTime);
    }
  }
  animate(0);
});
