import PixeE from "./pixee/pixee.js";
let count = 0;
let angle = 0;
let x = 0, y = 0;

const animationFps = 8;
const speed = 2;

function render(renderer) {
    renderer.clearScreen();
    renderer.drawImageClip(x, y, "pumpkin_dude", Math.floor(count), 0);
    renderer.drawImageClipRotated(200, 50, "pumpkin_dude", Math.floor(count), 0, angle);
}

function update(deltaTime, input) {
    angle += 2;
    count += deltaTime * animationFps;

    if (count >= 8) {
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
}

window.onload = () => {
    const p = new PixeE();
    p.initRenderer('game-canvas', 640, 360, '#000');

    const logger = p.getLogger();
    logger.warning("User", "Logger test.");

    const renderer = p.getRenderer();
    renderer.setRootImagePath("/res/img/");
    renderer.loadImageToMap("pumpkin_dude", 8, 1);

    p.setCallbacks(render, update);
    p.gameLoop()
};
