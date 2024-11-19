import PixeEClock from "./pixeeClock.js";
import { PixeELogLevel, PixeELogger } from "./pixeeLogger.js";
import PixeERenderer from "./pixeeRenderer.js";

// @desc The base context for the PixeE engine.
class PixeE {
    /**
     * @param debug Whether or not logging is desired.
     * @param timestamp Whether or not timestamps are desired with logging.
     * @param singleLine Whether or not logging should be on a single line, or split for readability.
     * @param defaultLogLevel The level of logging that should be displayed.
     * @returns void
     */
    constructor(
        debug = true,
        timestamp = true,
        singleLine = true,
        defaultLogLevel = PixeELogLevel.INFO
    ) {
        this.name = "PixeE";
        this.version = "a0.1.7";
        this.fullName = `${this.name} - ${this.version}`;

        this.clock = new PixeEClock();
        this.renderer = null;

        // Reference to the primary logger.
        this.logger = new PixeELogger(this.clock, debug, timestamp, singleLine, defaultLogLevel);
        this.logger.info(this.name, this.fullName);
    }

    /**
     * @desc Returns a reference to the primary logger instance.
     * @returns PixeELogger A reference to the PixeE context's PixeELogger instance.
     */
    getLogger() {
        return this.logger;
    }

    /**
     * @desc Returns a reference to the renderer.
     * @returns PixeERenderer A reference to the PixeE context's PixeERenderer instance.
     * Note: A reference to the PixeERenderer instance should only be grabbed after
     * having called the PixeE context's initRenderer() method.
     */
    getRenderer() {
        return this.renderer;
    }

    /**
     * @desc Initializes the renderer, which contains the Context2D.
     * @param canvasID The html id of the canvas element.
     * @param desiredWidth The desired width of the canvas.
     * @param desiredHeight The desired height of the canvas.
     * @param clearColor The clear color to be used when clearing the screen.
     * @returns void
     */
    initRenderer(canvasID, desiredWidth, desiredHeight, clearColor) {
        this.renderer = new PixeERenderer(canvasID, desiredWidth, desiredHeight, clearColor, this.logger);
    }
}

export default PixeE;