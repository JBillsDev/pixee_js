import { PixeELogLevels, PixeELogger } from "./pixeeLogger.js";

class PixeE {
    constructor() {
        this.name = "PixeE";
        this.version = "a0.0.2";
        this.fullName = `${this.name} - ${this.version}`;

        this.logger = new PixeELogger();
    }
}

export default PixeE;