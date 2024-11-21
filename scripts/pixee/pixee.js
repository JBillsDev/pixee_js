import PixeEClock from "./pixeeClock.js";
import PixeEInput from "./pixeeInput.js";
import { PixeELogLevel, PixeELogger } from "./pixeeLogger.js";
import PixeERenderer from "./pixeeRenderer.js";

// @desc The base context for the PixeE engine.
class PixeE {
    /**
     * @param canvasID The html ID of the canvas.
     * @param debug Whether or not logging is desired.
     * @param timestamp Whether or not timestamps are desired with logging.
     * @param singleLine Whether or not logging should be on a single line, or split for readability.
     * @param defaultLogLevel The level of logging that should be displayed.
     * @returns void
     */
    constructor(
        canvasID,
        debug = true,
        timestamp = true,
        singleLine = true,
        defaultLogLevel = PixeELogLevel.INFO
    ) {
        this.name = "PixeE";
        this.version = "a0.2.3";
        this.fullName = `${this.name} - ${this.version}`;
        this.running = true;

        this.canvasID = canvasID;

        // These are the callback functions that should be overridden to render and update game.
        this.frameRenderCallback = null;
        this.frameUpdateCallback = null;

        this.clock = new PixeEClock();
        this.renderer = null;

        // Reference to the primary logger.
        this.logger = new PixeELogger(this.clock, debug, timestamp, singleLine, defaultLogLevel);
        this.logger.info(this.name, this.fullName);

        this.input = new PixeEInput(this.canvasID);
    }

    /**
     * @desc This is the game loop that repeats until 'running' is set to false.
     * @returns void
     */
    gameLoop() {
        if (this.running === false) {
            return;
        }

        // Request the next animation frame, which should be in-sync with monitor refresh rate.
        requestAnimationFrame(this.gameLoop.bind(this));

        this.input.updateKeys(this.clock.deltaTime);
        this.frameUpdateCallback(this.clock.deltaTime, this.input);

        // Check if it is time to render the next drawn frame.
        this.clock.checkFrameTime();
        if (this.clock.isTimeToRender()) {
            this.frameRenderCallback(this.renderer);
        }
    }

    /**
     * @desc Returns a reference to the PixeEInput instance.
     * @returns PixeEInput
     */
    getInput() {
        return this.input;
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
     * @param desiredWidth The desired width of the canvas.
     * @param desiredHeight The desired height of the canvas.
     * @param clearColor The clear color to be used when clearing the screen.
     * @returns void
     */
    initRenderer(desiredWidth, desiredHeight, clearColor) {
        this.renderer = new PixeERenderer(this.canvasID, desiredWidth, desiredHeight, clearColor, this.logger);
    }

    /**
     * @desc Used to set the user-defined callbacks for render and update.
     * @param render Callback to the desired render function, where frames should be drawn.
     * @param update Callback to the desired update function, where logic should be handled.
     */
    setCallbacks(render, update) {
        this.frameRenderCallback = render;
        this.frameUpdateCallback = update;
    }
}

export default PixeE;