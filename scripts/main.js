import PixeE from "./pixee/pixee.js";
let count = 0;
let angle = 0;

window.onload = () => {
    const p = new PixeE();
    p.initRenderer('game-canvas', 640, 360, '#000');

    const logger = p.getLogger();
    logger.warning("User", "Logger test.");

    const renderer = p.getRenderer();
    renderer.setRootImagePath("/res/img/");
    renderer.clearScreen();

    renderer.loadImageToMap("pumpkin_dude", 8, 1);

    setInterval(() => {
        angle += 2;
        count++;
        if (count > 7) {
            count = 0;
        }

        renderer.clearScreen();
        renderer.drawImageClip(0, 0, "pumpkin_dude", count, 0);
        renderer.drawImageClipRotated(200, 50, "pumpkin_dude", count, 0, angle);
    }, 50)
};
