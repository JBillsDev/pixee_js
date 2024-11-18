import PixeE from "./pixee/pixee.js";
import {PixeELogLevel} from "./pixee/pixeeLogger.js";

window.onload = () => {
    const p = new PixeE();
    const logger = p.getLogger();
    logger.log("User", "Logger test.", PixeELogLevel.VERBOSE);
};
