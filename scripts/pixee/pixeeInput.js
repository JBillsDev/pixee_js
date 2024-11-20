class PixeEInputKey {
    constructor() {
        this.isDown = true;
        this.justPressed = true;
        this.lifeTime = 0.0;
    }
}

// Input class that gathers and relays input.
class PixeEInput {
    constructor() {
        this.justTriggeredLifetime = 0.1;
        this.inputMap = {}

        document.addEventListener("keydown", this.keyDownCallback.bind(this));
        document.addEventListener("keyup", this.keyUpCallback.bind(this))
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
     * @desc The callback used for keyDown events.
     * @param e The event object.
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