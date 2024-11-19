import PixeE from "./pixee/pixee.js";
let count = 0;
let angle = 0;
let x = 0, y = 0;
const speed = 4;

window.onload = () => {
    const p = new PixeE();
    p.initRenderer('game-canvas', 640, 360, '#000');

    const logger = p.getLogger();
    logger.warning("User", "Logger test.");

    const renderer = p.getRenderer();
    renderer.setRootImagePath("/res/img/");
    renderer.loadImageToMap("pumpkin_dude", 8, 1);

    const input = p.getInput();

    setInterval(() => {
        angle += 2;
        count++;
        if (count > 7) {
            count = 0;
        }

        if (input.getKeyDown("ArrowLeft")) {
            x -= speed;
        }
        if (input.getKeyDown("ArrowRight")) {
            x += speed;
        }
        if (input.getKeyDown("ArrowUp")) {
            y -= speed;
        }
        if (input.getKeyDown("ArrowDown")) {
            y += speed;
        }

        renderer.clearScreen();
        renderer.drawImageClip(x, y, "pumpkin_dude", count, 0);
        renderer.drawImageClipRotated(200, 50, "pumpkin_dude", count, 0, angle);
    }, 50)
};
