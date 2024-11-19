import Image2D from "./image2D.js";

// @desc Renderer class that stores the Context2D.
class PixeERenderer {
    /**
     * @param canvasID The html id of the canvas element.
     * @param desiredWidth The desired width of the canvas.
     * @param desiredHeight The desired height of the canvas.
     * @param clearColor The clear color to be used when clearing the screen.
     * @param logger A reference to the PixeE context's PixeELogger instance.
     * @returns void
     */
    constructor(canvasID, desiredWidth, desiredHeight, clearColor, logger) {
        this.arcBeginAngle = 0;
        this.arcEndAngle = Math.PI * 2;

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

        this.rootImagePath = '';
        this.imageExt = '.png';
        this.imageMap = {};
    }

    /**
     * @desc Clear the canvas to PixiERenderer's current clearColor.
     * @returns void
     */
    clearScreen() {
        this.ctx.fillStyle = this.clearColor;
        this.ctx.fillRect(0, 0, this.viewportWidth, this.viewportHeight);
    }

    /**
     * @desc Draws a circle at (x, y) of (radius) radius.
     * @param xPos X position of circle.
     * @param yPos Y position of circle.
     * @param radius Radius of circle.
     * @returns void
     */
    drawCircle(xPos, yPos, radius) {
        this.ctx.beginPath();
        this.ctx.arc(xPos, yPos, radius, this.arcBeginAngle, this.arcEndAngle, false);
        this.ctx.fill();
        this.ctx.closePath();
    }

    /**
     * @desc Draw an image from the renderer's imageMap.
     * @param xPos The x-position to draw the image.
     * @param yPos The y-position to draw the image.
     * @param imageName The name of the image to draw from the imageMap.
     * @returns void
     */
    drawImage(xPos, yPos, imageName) {
        this.ctx.drawImage(this.imageMap[imageName].img, xPos, yPos);
    }


    /**
     * @desc Draw a clipped image from the renderer's imageMap.
     * @param xPos The x-position to draw the image.
     * @param yPos The y-position to draw the image.
     * @param imageName The name of the image to draw from the imageMap.
     * @param clipX The clip's x-position within the image.
     * @param clipY The clip's y-position within the image.
     * @returns void
     */
    drawImageClip(xPos, yPos, imageName, clipX, clipY) {
        const image = this.imageMap[imageName];
        const clipPosX = clipX * image.clipWidth;
        const clipPosY = clipY * image.clipHeight;

        this.ctx.drawImage(image.img,
            clipPosX, clipPosY, image.clipWidth, image.clipHeight,
            xPos, yPos, image.clipWidth, image.clipHeight
        );
    }

    /**
     * @desc Draws a rectangle at (x, y) of (width, height) dimensions.
     * @param xPos X position of rectangle.
     * @param yPos Y position of rectangle.
     * @param width Width of rectangle.
     * @param height Height of rectangle.
     * @returns void
     */
    drawRect(xPos, yPos, width, height) {
        this.ctx.fillRect(xPos, yPos, width, height);
    }

    /**
     * @desc Free named image from imageMap.
     * @param imageName Name of the image to be removed.
     * @returns void
     */
    freeImageFromMap(imageName) {
        delete this.imageMap[imageName];
    }

    /**
     * @desc Loads an image into a stored map of images.
     * @param imageName The name of the image, without path or extension.
     * @param relativeImagePath The path, from the rootImagePath, to the image.
     * @param clipsX The number of horizontal clips.
     * @param clipsY The number of vertical clips.
     * @returns void
     */
    loadImageToMap(imageName, clipsX, clipsY, relativeImagePath = '') {
        const filePath = this.rootImagePath + relativeImagePath + imageName + this.imageExt;
        this.imageMap[imageName] = new Image2D(imageName, filePath, clipsX, clipsY);
    }

    /**
     * @desc Set the color to be used by subsequent draw calls.
     * @param color A string value containing a color.
     * @returns void
     * Note: The color value should be a CSS-allowed color value, i.e.:
     * 'rgb(255, 55, 0)', '#eee', 'hsl(50, 80%, 30%)', 'aqua'.
     */
    setRenderColor(color) {
        this.ctx.fillStyle = color;
    }

    /**
     * @desc Sets the color and alpha draw color to be used by subsequent draw calls.
     * The color values used can be integers (0 - 255) or percentages (0 - 100%).
     * The alpha value can be a float (0 - 1.0) or percentage (0 - 100%).
     * @param red The red value.
     * @param green The green value.
     * @param blue The blue value.
     * @param alpha The alpha value.
     * @returns void
     */
    setRenderColorRgba(red, green, blue, alpha = 1.0) {
        console.log(`${red} ${green} ${blue}`);
        this.ctx.fillStyle = `rgb(${red} ${green} ${blue} / ${alpha})`;
    }

    /**
     * @desc Sets the root path where images are stored.
     * @param rootImagePath The relative, root folder used for images.
     */
    setRootImagePath(rootImagePath = '') {
        this.rootImagePath = rootImagePath;
    }
}

export default PixeERenderer;