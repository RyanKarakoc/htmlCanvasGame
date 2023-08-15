import { Game } from "./game/game.js";
import { Paused } from "./game/Screens/paused.js";
import { ControlsScreen } from "./game/Screens/controls.js";
import { Highscores } from "./game/Screens/highscores.js";
import { SearchUser } from "./game/Screens/searchUser.js";
import { GameOverScreen } from "./game/Screens/gameOver.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height, canvas);
  const paused = new Paused(game);
  const controlScreen = new ControlsScreen(game);
  const highscores = new Highscores(game);
  const searchUser = new SearchUser(game);
  const gameOver = new GameOverScreen(game);

  let lastTime = 0;

  function animate(timeStamp) {
    console.log(game.screen);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);

    if (game.screen[0] === "mainMenu") {
      game.mainMenu.draw(context);
      game.mainMenu.update();
    }

    if (game.screen[0] === "controls") {
      controlScreen.draw(context);
      controlScreen.update();
    }

    if (game.screen[0] === "highscores") {
      highscores.draw(context);
      highscores.update();
    }

    if (game.screen[0] === "searchUser") {
      searchUser.draw(context);
      searchUser.update();
    }

    if (game.screen[0] === "gameOver") {
      gameOver.draw(context);
      gameOver.update();
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
