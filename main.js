import { Game } from "./game/game.js";
import { Menu } from "./game/Screens/menu.js";
import { Paused } from "./game/Screens/paused.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height, canvas);
  const paused = new Paused(game);

  let lastTime = 0;

  function animate(timeStamp) {
    console.log(game.paused);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);

    if (game.screens[0] === "mainMenu")
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
