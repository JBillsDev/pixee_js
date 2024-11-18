import { PixeELogLevels, PixeELogger } from "./pixeeLogger.js";

// @desc The base context for the PixeE engine.
class PixeE {
    constructor(defaultLogLevel = PixeELogLevels.INFO) {
        this.name = "PixeE";
        this.version = "a0.0.3";
        this.fullName = `${this.name} - ${this.version}`;

        // Reference to the primary logger.
        this.logger = new PixeELogger(defaultLogLevel);
    }

    // @desc Returns a reference to the primary logger instance.
    getLogger() {
        return this.logger;
    }
}

export default PixeE;