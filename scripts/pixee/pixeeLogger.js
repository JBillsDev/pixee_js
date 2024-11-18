// @desc Enumerations specifying the various 'levels' of logging supported by PixeE.
export const PixeELogLevels = Object.freeze({
    // Intended for very detailed, often unnecessary messages.
    VERBOSE: Symbol("VERBOSE"),
    // Intended for generally helpful information.
    INFO: Symbol("INFO"),
    // Intended for items that may be an issue, but aren't likely to cause a crash.
    WARNING: Symbol("WARNING"),
    // Intended for show-stopping issues that need to be addressed.
    ERROR: Symbol("ERROR")
});

// @desc Logging class to assist with console debugging.
export class PixeELogger {
    constructor(defaultLogLevel = PixeELogLevels.INFO) {
        /* This value decides the types of messages you will see display
        * in the console.
        * Set it via 'setLogLevel' to enforce consistency and
        * provide the user with an indicator of the current log level
        * should they not set it themselves. */
        this.logLevel = null;
        this.setLogLevel(defaultLogLevel);
    };


    // @desc Set the 'log level' of the logger.
    setLogLevel(newLogLevel) {
        this.logLevel = newLogLevel;
        switch (this.logLevel) {
            case PixeELogLevels.ERROR:
                break;
            case PixeELogLevels.INFO:
                break;
            case PixeELogLevels.VERBOSE:
                break;
            case PixeELogLevels.WARNING:
                break;
        }
    };
}