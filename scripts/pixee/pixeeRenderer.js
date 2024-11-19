// @desc Renderer class that stores the Context2D.
class PixeERenderer {
    /* @desc Constructs the renderer, which contains the Context2D.
     * @param (string) The html id of the canvas element.
     * @param (integer) The desired width of the canvas.
     * @param (integer) The desired height of the canvas.
     * @param (color) The clear color to be used when clearing the screen.
     */
    constructor(canvasID, desiredWidth, desiredHeight, clearColor, logger) {
        this.viewportWidth = desiredWidth;
        this.viewportHeight = desiredHeight;
        this.clearColor = clearColor;
        this.logger = logger;

        // Verify we are able to retrieve the canvas by ID.
        const canvas = document.getElementById(canvasID);
        if (!canvas) {
            this.logger.error("PixeERenderer", "Could not find canvas with ID: " + canvasID);
            return;
        }

        /* Set the dimensions of the canvas.
         * The dimensions of the fillRect() calls must not exceed the size of the canvas,
         * else they will fail.
         */
        canvas.width = this.viewportWidth;
        canvas.height = this.viewportHeight;

        // Attempt to create the Context2D.
        this.ctx = canvas.getContext("2d");
        if (!this.ctx) {
            this.logger.error("PixeERenderer", "Could not get context from canvas with ID: " + canvasID);
        }
    }

    /* @desc Clear the canvas to PixiERenderer's current clearColor.
     * @returns (void)
     */
    clearScreen() {
        this.ctx.fillStyle = this.clearColor;
        this.ctx.fillRect(0, 0, this.viewportWidth, this.viewportHeight);
    }

    /* @desc Draws a rectangle at (x, y) of (width, height) dimensions.
     * @param (number) X position of rectangle.
     * @param (number) Y position of rectangle.
     * @param (number) Width of rectangle.
     * @param (number) Height of rectangle.
     * @ returns (void)
     */
    drawRect(xPos, yPos, width, height) {
        this.ctx.fillRect(xPos, yPos, width, height);
    }

    /* @desc Set the color to be used by subsequent draw calls.
     * The color value should be a CSS-allowed color value, i.e.:
     * 'rgb(255, 55, 0)', '#eee', 'hsl(50, 80%, 30%)', 'aqua'.
     * @param (color) A string value containing a color.
     * @returns (void)
     */
    setRenderColor(color) {
        this.ctx.fillStyle = color;
    }

    /* @desc Sets the color and alpha draw color to be used by subsequent draw calls.
     * The color values used can be integers (0 - 255) or percentages (0 - 100%).
     * The alpha value can be a float (0 - 1.0) or percentage (0 - 100%).
     * @param (number) The red value.
     * @param (number) The green value.
     * @param (number) The blue value.
     * @param (number) The alpha value.
     * @returns (void)
     */
    setRenderColorRgba(red, green, blue, alpha = 1.0) {
        console.log(`${red} ${green} ${blue}`);
        this.ctx.fillStyle = `rgb(${red} ${green} ${blue} / ${alpha})`;
    }
}

export default PixeERenderer;