/**
 * Class representing a 2D image with optional sprite sheet clipping.
 */
class Image2D {
    /**
     * @param name - Name of the image, used in the filepath, but without extension.
     * @param filePath The relative path to the image.
     * @param clipsX The number of horizontal clips.
     * @param clipsY The number of vertical clips.
     */
    constructor(name, filePath, clipsX = 1, clipsY = 1) {
        this.name = name;
        // Whether or not the file has been loaded and is ready for use.
        this.isLoaded = false;

        // The dimensions of the image, set when the image is fully loaded.
        this.imgWidth = 0;
        this.imgHeight = 0;

        // The clipping values of the image.
        // By default, images are set to a single clip.
        this.clipWidth = 0;
        this.clipHeight = 0;
        this.clipsX = clipsX;
        this.clipsY = clipsY;

        // Create the image, and set its onload callback.
        this.img = new Image();
        this.img.onload = () => {
            this.isLoaded = true;

            // Pull the actual dimensions of the image from the system.
            this.imgWidth = this.img.width;
            this.imgHeight = this.img.height;

            // Determine the size of each clip.
            // Note: Only supports evenly-sized clips.
            this.clipWidth = this.imgWidth / this.clipsX;
            this.clipHeight = this.imgHeight / this.clipsY;
        }

        // Set the filepath of the image, which will trigger it to load.
        this.img.src = filePath;
    }
}

export default Image2D;