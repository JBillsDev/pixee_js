import PixeEClock from "./pixeeClock.js";
import { PixeELogLevel, PixeELogger } from "./pixeeLogger.js";

// @desc The base context for the PixeE engine.
class PixeE {
    constructor(
        debug = true,
        timestamp = true,
        singleLine = true,
        defaultLogLevel = PixeELogLevel.INFO
    ) {
        this.name = "PixeE";
        this.version = "a0.0.10";
        this.fullName = `${this.name} - ${this.version}`;

        this.clock = new PixeEClock();

        // Reference to the primary logger.
        this.logger = new PixeELogger(this.clock, debug, timestamp, singleLine, defaultLogLevel);
        this.logger.info(this.name, this.fullName);
    }

    /* @desc Returns a reference to the primary logger instance.
     * @returns (void)
     */
    getLogger() {
        return this.logger;
    }
}

export default PixeE;