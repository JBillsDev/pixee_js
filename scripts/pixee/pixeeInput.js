// Input class that gathers and relays input.
class PixeEInput {
    constructor() {
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
        return this.inputMap[key] || false;
    }

    /**
     * @desc The callback used for keyDown events.
     * @param e The event object.
     */
    keyDownCallback(e) {
        this.inputMap[e.key] = true;
    }

    /**
     * @desc The callback used for keyUp events.
     * @param e The event object.
     */
    keyUpCallback(e) {
        this.inputMap[e.key] = false;
    }
}

export default PixeEInput;