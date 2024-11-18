import PixeE from "./pixee/pixee.js";
import {PixeELogLevel} from "./pixee/pixeeLogger.js";

window.onload = () => {
    const p = new PixeE();
    const logger = p.getLogger();
    logger.warning("User", "Logger test.");
};
