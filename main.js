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
      canvas.addEventListener("click", (e) => {
        if (
          e.clientX <= 680 &&
          e.clientX >= 580 &&
          e.clientY <= 460 &&
          e.clientY >= 430
        ) {
          console.log("controls");
        }
      });
      menu.draw(context);
    }

    if (!game.gameOver) requestAnimationFrame(animate);

    if (!game.menu && !game.paused) game.update(deltaTime);

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
