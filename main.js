import { Game } from "./game.js";
import { Menu } from "./menu.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height);
  const menu = new Menu(game);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);

    if (game.menu) {
      menu.draw(context);
      canvas.addEventListener("click", (e) => {
        console.log(e.x, e.y);
        if (e.x > 520 && e.x < 680 && e.y > 430 && e.y < 460) {
          game.controls = true;
          game.menu = false;
        }
        if (e.x > 555 && e.x < 645 && e.y > 530 && e.y < 560) {
          game.menu = false;
        }
      });
    }

    if (game.controls) {
      canvas.addEventListener("click", (e) => {
        if (e.x > 970 && e.x < 1035 && e.y > 235 && e.y < 265) {
          game.controls = false;
          game.menu = true;
        }
      });
      menu.controls(context);
    }

    if (!game.gameOver) requestAnimationFrame(animate);

    if (!game.menu && !game.controls && !game.paused) game.update(deltaTime);

    console.log(
      "menu",
      game.menu,
      "controls",
      game.controls,
      "play",
      game.play
    );
  }
  animate(0);
});
