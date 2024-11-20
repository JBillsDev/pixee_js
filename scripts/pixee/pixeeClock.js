/**
 * @type {Readonly<{HOUR: number, SECOND: number, MINUTE: number, DAY: number}>}
 */
const PixeETimeValuesInMillis = Object.freeze({
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000
});

/**
 * @desc The core game clock.
 */
class PixeEClock {
    constructor() {
        this.appStartTime = Date.now();

        // Fps related variables.
        this.currentFps = 0;
        this.desiredFPS = 30;
        this.fpsInterval = PixeETimeValuesInMillis.SECOND / this.desiredFPS;
        this.frameCount = 0;

        // Frame time variables.
        this.deltaTime = 0;
        this.elapsedTime = 0;
        this.lastFrameTime = this.appStartTime;
        this.currentTime = this.appStartTime;
    }

    /**
     * @desc Checks and updates the time between when this is called and the last recorded frame time.
     * @returns void
     */
    checkFrameTime() {
        // Get the milliseconds (shown as fraction of a second) since last frame.
        this.deltaTime = (Date.now() - this.currentTime) / PixeETimeValuesInMillis.SECOND;

        this.currentTime = Date.now();
        this.elapsedTime = this.currentTime - this.lastFrameTime;
    }

    /**
     * @desc Used to get time (in milliseconds) elapsed since the PixeE class was created.
     * @returns (number) Returns number in milliseconds.
     */
    getElapsedTime() {
        return Date.now() - this.appStartTime;
    }

    /**
     * @desc Used to get a formatted timestamp (in milliseconds).
     * @returns (number) Returns number in milliseconds.
     */
    getElapsedTimeFormatted() {
        let time = Date.now() - this.appStartTime;
        let timeRemaining = time;

        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        let timestamp = "";

        // Add the days value to the timestamp.
        if (time > PixeETimeValuesInMillis.DAY) {
            days = Math.floor(timeRemaining / PixeETimeValuesInMillis.DAY);
            timeRemaining -= days * PixeETimeValuesInMillis.DAY;
        }

        timestamp += days < 10 ? `0${days}` : days;

        // Add the hours values to the timestamp.
        if (time > PixeETimeValuesInMillis.HOUR) {
            hours = Math.floor(timeRemaining / PixeETimeValuesInMillis.HOUR);
            timeRemaining -= hours * PixeETimeValuesInMillis.HOUR;
        }

        timestamp += ":" + (hours < 10 ? `0${hours}` : hours);

        // Add the minutes value to the timestamp.
        if (time > PixeETimeValuesInMillis.MINUTE) {
            minutes = Math.floor(timeRemaining / PixeETimeValuesInMillis.MINUTE);
            timeRemaining -= minutes * PixeETimeValuesInMillis.MINUTE;
        }

        timestamp += ":" + (minutes < 10 ? `0${minutes}` : minutes);

        // Add the seconds value to the timestamp.
        if (time > PixeETimeValuesInMillis.SECOND) {
            seconds = Math.floor(timeRemaining / PixeETimeValuesInMillis.SECOND);
            timeRemaining -= seconds * PixeETimeValuesInMillis.SECOND;
        }

        timestamp += ":" + (seconds < 10 ? `0${seconds}` : seconds);

        // Add the milliseconds value to the timestamp.
        if (timeRemaining < 10) {
            timestamp += ".00" + timeRemaining;
        } else if (timeRemaining < 100) {
            timestamp += ".0" + timeRemaining;
        } else {
            timestamp += "." + timeRemaining;
        }

        return timestamp;
    }

    /**
     * @desc Performs Fps calculation, and returns true when it is time to call the next render frame.
     * @returns {boolean}
     */
    isTimeToRender() {
        if (this.elapsedTime > this.fpsInterval) {
            this.lastFrameTime = this.currentTime - (this.elapsedTime % this.fpsInterval);

            const timeSinceStart = this.currentTime - this.appStartTime;
            this.currentFps = Math.round(
                PixeETimeValuesInMillis.SECOND / (timeSinceStart / ++this.frameCount
                ) * 100) / 100;
            return true;
        }

        return false;
    }
}

export default PixeEClock;