import PixeE from "./pixee/pixee.js";

window.onload = () => {
    const p = new PixeE();
    p.initRenderer('game-canvas', 640, 360, '#000');

    const logger = p.getLogger();
    logger.warning("User", "Logger test.");

    const renderer = p.getRenderer();
    renderer.clearScreen();

    renderer.setRenderColor('#f00');
    renderer.drawRect(0, 0, 100, 100);
};
