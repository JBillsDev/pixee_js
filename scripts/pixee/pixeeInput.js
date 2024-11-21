import { clamp } from "./pixeeUtility.js";

// Object containing string values for mouse button input.
export const PixeEInputMouseButton = Object.freeze({
    LEFT: "MOUSE_LEFT",
    MIDDLE: "MOUSE_MIDDLE",
    RIGHT: "MOUSE_RIGHT"
});

// Class used to represent the various aspects of an input key in use.
class PixeEInputKey {
    constructor() {
        this.isDown = true;
        this.justPressed = true;
        this.lifeTime = 0.0;
    }
}

// Input class that gathers and relays input.
export class PixeEInput {
    constructor(canvasID) {
        this.canvasElement = document.getElementById(canvasID);
        this.justTriggeredLifetime = 0.025;

        this.inputMap = {}
        this.mouseX = 0;
        this.mouseY = 0;

        // Store the bound event handler for adding and removing the callback.
        this.boundDisableContextMenuEventHandler = this.disableContextMenuCallback.bind(this);
        this.disableContextMenu(true);

        document.addEventListener("keydown", this.keyDownCallback.bind(this));
        document.addEventListener("keyup", this.keyUpCallback.bind(this));

        document.addEventListener("mousedown", this.mouseDownCallback.bind(this));
        document.addEventListener("mousemove", this.mouseMoveCallback.bind(this));
        document.addEventListener("mouseup", this.mouseUpCallback.bind(this));
    }

    /**
     * @desc Used to enable or disable the capture of the right-click menu.
     * @returns void
     */
    disableContextMenu(disable) {
        if (disable) {
            document.addEventListener("contextmenu", this.boundDisableContextMenuEventHandler);
        } else {
            try {
                document.removeEventListener("contextmenu", this.boundDisableContextMenuEventHandler);
            } catch (error) {

            }
        }
    }

    /**
     * @desc Used to prevent or enable the right-click menu from appearing on the webpage.
     * @param e The event object.
     * @returns void
     */
    disableContextMenuCallback(e) {
        e.preventDefault();
    }

    /**
     * @desc Updates any keyboard key or mouse button passed in.
     * @param value The key or button that needs to be updated.
     * @param down 'true' if the key or button is currently pressed.
     * @returns void
     */
    updateInputValueInMap(value, down) {
        if (!(value in this.inputMap)) {
            if (down) {
                this.inputMap[value] = new PixeEInputKey();
            }

            return;
        }

        this.inputMap[value].isDown = down;
        this.inputMap[value].justReleased = true;
        this.inputMap[value].lifeTime = 0.0;
    }

    /**
     * @desc Returns true or false, signifying if the requested key is pressed.
     * @param key The requested keyboard key.
     * @returns boolean
     */
    getInputDown(key) {
        return this.inputMap[key]?.isDown;
    }

    /**
     * @desc Returns true if the key in question was just pressed within a very short window.
     * @param key The requested keyboard key.
     * @returns boolean
     */
    getInputJustPressed(key) {
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
    getInputJustReleased(key) {
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
        this.updateInputValueInMap(e.key, true);
    }

    /**
     * @desc The callback used for keyUp events.
     * @param e The event object.
     * @returns void
     */
    keyUpCallback(e) {
        this.updateInputValueInMap(e.key, false);
    }

    /**
     * @desc The callback for mouseButtonDown events.
     * @param e The event object.
     * @returns void
     */
    mouseDownCallback(e) {
        switch (e.button) {
            case 0:
                this.updateInputValueInMap(PixeEInputMouseButton.LEFT, true);
                break;
            case 1:
                this.updateInputValueInMap(PixeEInputMouseButton.MIDDLE, true);
                break;
            case 2:
                this.updateInputValueInMap(PixeEInputMouseButton.RIGHT, true);
                break;
        }
    }

    /**
     * @desc The callback for mouseButtonUp events.
     * @param e The event object.
     * @returns void
     */
    mouseUpCallback(e) {
        switch (e.button) {
            case 0:
                this.updateInputValueInMap(PixeEInputMouseButton.LEFT, false);
                break;
            case 1:
                this.updateInputValueInMap(PixeEInputMouseButton.MIDDLE, false);
                break;
            case 2:
                this.updateInputValueInMap(PixeEInputMouseButton.RIGHT, false);
                break;
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