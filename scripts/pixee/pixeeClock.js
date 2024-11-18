// @desc The core game clock.
class PixeEClock {
    constructor() {
        this.appStartTime = Date.now();
    }

    /* @desc Used to get time (in milliseconds) elapsed since the PixeE class was created.
     * @returns (number) Returns number in milliseconds.
     */
    getElapsedTime() {
        return Date.now() - this.appStartTime;
    }
}

export default PixeEClock;