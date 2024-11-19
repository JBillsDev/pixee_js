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
}

export default PixeEClock;