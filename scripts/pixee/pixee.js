import PixeEClock from "./pixeeClock.js";
import { PixeELogLevel, PixeELogger } from "./pixeeLogger.js";
import PixeERenderer from "./pixeeRenderer.js";

// @desc The base context for the PixeE engine.
class PixeE {
    constructor(
        debug = true,
        timestamp = true,
        singleLine = true,
        defaultLogLevel = PixeELogLevel.INFO
    ) {
        this.name = "PixeE";
        this.version = "a0.1.2";
        this.fullName = `${this.name} - ${this.version}`;

        this.clock = new PixeEClock();
        this.renderer = null;

        // Reference to the primary logger.
        this.logger = new PixeELogger(this.clock, debug, timestamp, singleLine, defaultLogLevel);
        this.logger.info(this.name, this.fullName);
    }

    /* @desc Returns a reference to the primary logger instance.
     * @returns (PixeELogger)
     */
    getLogger() {
        return this.logger;
    }

    /* @desc Returns a reference to the renderer.
     * @ returns (PixeERenderer)
     */
    getRenderer() {
        return this.renderer;
    }

    /* @desc Initializes the renderer, which contains the Context2D.
     * @param (string) The html id of the canvas element.
     * @param (integer) The desired width of the canvas.
     * @param (integer) The desired height of the canvas.
     * @param (color) The clear color to be used when clearing the screen.
     */
    initRenderer(canvasID, desiredWidth, desiredHeight, clearColor) {
        this.renderer = new PixeERenderer(canvasID, desiredWidth, desiredHeight, clearColor, this.logger);
    }
}

export default PixeE;