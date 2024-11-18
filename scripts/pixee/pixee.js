import { PixeELogLevel, PixeELogger } from "./pixeeLogger.js";

// @desc The base context for the PixeE engine.
class PixeE {
    constructor(defaultLogLevel = PixeELogLevel.INFO) {
        this.name = "PixeE";
        this.version = "a0.0.4";
        this.fullName = `${this.name} - ${this.version}`;

        // Reference to the primary logger.
        this.logger = new PixeELogger(defaultLogLevel);
        this.logger.log(this.name, this.fullName, PixeELogLevel.INFO);
    }

    /* @desc Returns a reference to the primary logger instance.
     * @returns (void)
     */
    getLogger() {
        return this.logger;
    }
}

export default PixeE;