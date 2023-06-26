import { Game } from "./game.js";
import { Menu } from "./menu.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height, canvas);
  const menu = new Menu(game);

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

    if (game.gameOver) {
      canvas.addEventListener("click", (e) => {
        if (
          e.layerX > 405 &&
          e.layerX < 505 &&
          e.layerY > 315 &&
          e.layerY < 345
        ) {
          location.reload();
        }
      });
    }

    if (!game.gameOver) requestAnimationFrame(animate);

    if (!game.menu && !menu.controls && !game.paused) game.update(deltaTime);
  }
  animate(0);
});
