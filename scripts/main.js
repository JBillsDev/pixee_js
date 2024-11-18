import PixeE from "./pixee/pixee.js";

window.onload = () => {
    const p = new PixeE();
    const logger = p.getLogger();
    logger.warning("User", "Logger test.");

    setInterval(() => {
        logger.verbose("Clock", `Timestamp test.`);
    }, 1000);
};
