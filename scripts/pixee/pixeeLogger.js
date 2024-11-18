// @desc Enumerations specifying the various 'levels' of logging supported by PixeE.
export const PixeELogLevel = Object.freeze({
    // Intended for very detailed, often unnecessary messages.
    VERBOSE: "VERBOSE",
    // Intended for generally helpful information.
    INFO: "INFO",
    // Intended for items that may be an issue, but aren't likely to cause a crash.
    WARNING: "WARNING",
    // Intended for show-stopping issues that need to be addressed.
    ERROR: "ERROR"
});

// @desc Logging class to assist with console debugging.
export class PixeELogger {
    constructor(debug = true, defaultLogLevel = PixeELogLevel.INFO) {
        // This value decides whether or not messages get logged to console.
        this.debug = debug;

        /* This value decides the types of messages you will see display
         * in the console.
         * Set it via 'setLogLevel' to enforce consistency and
         * provide the user with an indicator of the current log level
         * should they not set it themselves.
         */
        this.logLevel = null;
        this.setLogLevel(defaultLogLevel);
    };

    /* @desc Allows the enabling/disabled of the debug variable.
     * @param (boolean) true to enable.
     */
    enableDebug(debug) {
        this.debug = debug;
    }

    /* @desc Used to log ERROR messages.
     * @param {string} 'Name' or identifier of the caller.
     * @param {string} The desired message.
     * @returns {void}
     */
    error(source, message) {
        this.log(source, message, PixeELogLevel.ERROR);
    };

    /* @desc Used to log INFO messages.
     * @param {string} 'Name' or identifier of the caller.
     * @param {string} The desired message.
     * @returns {void}
     */
    info(source, message) {
        this.log(source, message, PixeELogLevel.INFO);
    };

    /* @desc The lowest-level logging method.
     * @param {string} 'Name' or identifier of the caller.
     * @param {string} The desired message.
     * @param {PixeELogLevel} The intended PixeELogLevel logLevel.
     * @returns {void}
     */
    log(source, message, logLevel) {
        if (!this.debug) return;

        const type = PixeELogLevel[logLevel];
        const finalMessage = `[${type}]\n${source}:\n${message}`;
        console.log(finalMessage);
    };

    /* @desc Used to log VERBOSE messages.
     * @param {string} 'Name' or identifier of the caller.
     * @param {string} The desired message.
     * @returns {void}
     */
    verbose(source, message) {
        this.log(source, message, PixeELogLevel.VERBOSE);
    };

    /* @desc Used to log WARNING messages.
     * @param {string} 'Name' or identifier of the caller.
     * @param {string} The desired message.
     * @returns {void}
     */
    warning(source, message) {
        this.log(source, message, PixeELogLevel.WARNING);
    };

    /* @desc Set the 'log level' of the logger.
     * @param {PixeELogLevel} The PixeELogLevel enum value of intended log level.
     * @returns {void}
     */
    setLogLevel(newLogLevel) {
        /* This switch ensures the log level was set to
         * one of the intended values, else gives a warning.
         */
        switch (newLogLevel) {
            case PixeELogLevel.ERROR:
            case PixeELogLevel.INFO:
            case PixeELogLevel.VERBOSE:
            case PixeELogLevel.WARNING:
                this.logLevel = newLogLevel;
                this.log("PixeE", `Log level set to ${this.logLevel}.`, PixeELogLevel.INFO);
                break;
            default:
                console.log("Failed");
                break;
        }
    };
}