import { clamp } from "./pixeeUtility.js";

class PixeEInputKey {
    constructor() {
        this.isDown = true;
        this.justPressed = true;
        this.lifeTime = 0.0;
    }
}

// Input class that gathers and relays input.
class PixeEInput {
    constructor(canvasID) {
        this.canvasElement = document.getElementById(canvasID);
        this.justTriggeredLifetime = 0.1;

        this.inputMap = {}
        this.mouseX = 0;
        this.mouseY = 0;

        document.addEventListener("keydown", this.keyDownCallback.bind(this));
        document.addEventListener("keyup", this.keyUpCallback.bind(this));
        document.addEventListener("mousemove", this.mouseMoveCallback.bind(this));
    }

    /**
     * @desc Returns true or false, signifying if the requested key is pressed.
     * @param key The requested keyboard key.
     * @returns boolean
     */
    getKeyDown(key) {
        return this.inputMap[key]?.isDown;
    }

    /**
     * @desc Returns true if the key in question was just pressed within a very short window.
     * @param key The requested keyboard key.
     * @returns boolean
     */
    getKeyJustPressed(key) {
        if (key in this.inputMap) {
            if (this.inputMap[key].justPressed) {
                this.inputMap[key].justPressed = false;
                return true;
            }
        }

        return false;
    }


    /**
     * @desc Returns true if the key in question was just released within a very short window.
     * @param key The requested keyboard key.
     * @returns boolean
     */
    getKeyJustReleased(key) {
        if (key in this.inputMap) {
            if (this.inputMap[key].justReleased) {
                delete this.inputMap[key];
                return true;
            }
        }

        return false;
    }

    /**
     * @desc Returns an array containing [mouseX, mouseY].
     * @returns {number[]}
     */
    getMousePos() {
        return [this.mouseX, this.mouseY];
    }

    /**
     * @desc The callback used for keyDown events.
     * @param e The event object.
     * @returns void
     */
    keyDownCallback(e) {
        if (!(e.key in this.inputMap)) {
            this.inputMap[e.key] = new PixeEInputKey();
        }
    }

    /**
     * @desc The callback used for keyUp events.
     * @param e The event object.
     */
    keyUpCallback(e) {
        if (e.key in this.inputMap) {
            this.inputMap[e.key].isDown = false;
            this.inputMap[e.key].justReleased = true;
            this.inputMap[e.key].lifeTime = 0.0;
        }
    }

    /**
     * @desc The callback used for mouseMove events.
     * @param e The event object.
     * @returns void
     */
    mouseMoveCallback(e) {
        const rect = this.canvasElement.getBoundingClientRect();
        this.mouseX = clamp((e.clientX - rect.left), 0, rect.width);
        this.mouseY = clamp((e.clientY - rect.top), 0, rect.height);

        console.log(this.mouseX, this.mouseY);
    }

    /**
     * @desc Updates the state of currently recorded keyboard key presses.
     * @param deltaTime The time (in fractions of a second) that have elapsed since the last update.
     * @returns void
     */
    updateKeys(deltaTime) {
        for (const key in this.inputMap) {
            const currentKey = this.inputMap[key];
            currentKey.lifeTime += deltaTime;
            if (currentKey.justPressed &&
                currentKey.isDown &&
                currentKey.lifeTime >= this.justTriggeredLifetime) {
                currentKey.justPressed = false;
            }

            if ((!this.inputMap[key].isDown) &&
                (this.inputMap[key].lifeTime >= this.justTriggeredLifetime)) {
                delete this.inputMap[key];
            }
        }
    }
}

export default PixeEInput;