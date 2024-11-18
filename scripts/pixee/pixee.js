import { PixeELogLevel, PixeELogger } from "./pixeeLogger.js";

// @desc The base context for the PixeE engine.
class PixeE {
    constructor(
        debug = true,
        singleLine = true,
        defaultLogLevel = PixeELogLevel.INFO
    ) {
        this.name = "PixeE";
        this.version = "a0.0.7";
        this.fullName = `${this.name} - ${this.version}`;

        // Reference to the primary logger.
        this.logger = new PixeELogger(debug, singleLine, defaultLogLevel);
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