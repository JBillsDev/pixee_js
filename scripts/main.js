import PixeE from "./pixee/pixee.js";
import { PixeEInputMouseButton } from "./pixee/pixeeInput.js";

let count = 0;
let angle = 0;
let x = 0, y = 0;
let mousePos = [];

const animationFps = 8;
const speed = 2;

function render(renderer) {
    renderer.clearScreen();
    renderer.drawImageClip(x, y, "pumpkin_dude", Math.floor(count), 0);
    renderer.drawImageClipRotated(200, 50, "pumpkin_dude", Math.floor(count), 0, angle);
    renderer.drawImageClip(mousePos[0], mousePos[1], "pumpkin_dude", Math.floor(count), 0);
}

function update(deltaTime, input) {
    // angle += 2;
    count += deltaTime * animationFps;

    if (count >= 8) {
        count = 0;
    }

    if (input.getInputDown("ArrowLeft")) {
        x -= speed;
    }
    if (input.getInputDown("ArrowRight")) {
        x += speed;
    }
    if (input.getInputDown("ArrowUp")) {
        y -= speed;
    }
    if (input.getInputDown("ArrowDown")) {
        y += speed;
    }

    mousePos = input.getMousePos();
    if (input.getInputJustPressed(PixeEInputMouseButton.LEFT)) {
        angle += 15;
    }
    if (input.getInputJustPressed(PixeEInputMouseButton.RIGHT)) {
        angle -= 15;
    }
    if (input.getInputJustPressed(PixeEInputMouseButton.MIDDLE)) {
        angle += 180;
    }

    if (input.getInputDown(PixeEInputMouseButton.LEFT)) {
        angle += 1.5;
    }
}

window.onload = () => {
    const p = new PixeE('game-canvas');
    p.initRenderer(640, 360, '#000');

    const logger = p.getLogger();
    logger.warning("User", "Logger test.");

    const renderer = p.getRenderer();
    renderer.setRootImagePath("/res/img/");
    renderer.loadImageToMap("pumpkin_dude", 8, 1);

    p.setCallbacks(render, update);
    p.gameLoop()
};
