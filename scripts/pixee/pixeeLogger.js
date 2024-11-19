import PixeEClock from "./pixeeClock.js";

/**
 * An enumeration representing the different levels of logging available
 * in the PixeE application. Each level is intended to convey the importance
 * and nature of messages logged by the system.
 *
 * - `VERBOSE`: Intended for very detailed, often unnecessary messages.
 * - `INFO`: Intended for generally helpful information.
 * - `WARNING`: Intended for items that may be an issue, but aren't likely to cause a crash.
 * - `ERROR`: Intended for show-stopping issues that need to be addressed.
 *
 * @readonly
 * @enum {number}
 */
export const PixeELogLevel = Object.freeze({
    // Intended for very detailed, often unnecessary messages.
    VERBOSE: 0,
    // Intended for generally helpful information.
    INFO: 1,
    // Intended for items that may be an issue, but aren't likely to cause a crash.
    WARNING: 2,
    // Intended for show-stopping issues that need to be addressed.
    ERROR: 3
});

/**
 * A logger class that allows for various levels of message logging with configurable options.
 */
export class PixeELogger {
    constructor(clock, debug = true, timestamp = true, singleLine = true, defaultLogLevel = PixeELogLevel.INFO) {
        // Reference to the core PixeEClock
        this.clock = clock;

        // This value decides whether or not messages get logged to console.
        this.debug = debug;
        // This value decides whether or not messages get logged in a single line, or split for readability.
        this.singleLine = singleLine;
        // This value decides whether or not a timestamp gets added to each log message.
        this.timestamp = timestamp;

        /* This value decides the types of messages you will see display
         * in the console.
         * Set it via 'setLogLevel' to enforce consistency and
         * provide the user with an indicator of the current log level
         * should they not set it themselves.
         */
        this.logLevel = null;
        this.setLogLevel(defaultLogLevel);
    };

    /**
     * @desc Allows the enabling/disabled of the debug variable.
     * @param debug Set to 'true' to enable debugging.
     * @returns void
     */
    enableDebug(debug) {
        this.debug = debug;
    }

    /**
     * @desc Allows the enabling/disabling of single-line logging.
     * @param singleLine Set to 'true' to enable single-line logging.
     * @returns void
    */
    enableSingleLine(singleLine) {
        this.singleLine = singleLine;
    }

    /**
     * @desc Used to log ERROR messages.
     * @param source 'Name' or identifier of the caller.
     * @param message The desired message.
     * @returns void
     */
    error(source, message) {
        this.log(source, message, PixeELogLevel.ERROR);
    };

    /**
     * @desc Used to log INFO messages.
     * @param source 'Name' or identifier of the caller.
     * @param message The desired message.
     * @returns void
     */
    info(source, message) {
        this.log(source, message, PixeELogLevel.INFO);
    };

    /**
     * @desc The lowest-level logging method.
     * @param source 'Name' or identifier of the caller.
     * @param message The desired message.
     * @param logLevel The intended PixeELogLevel logLevel.
     * @returns void
     */
    log(source, message, logLevel) {
        if (!this.debug ||
            this.logLevel > logLevel) {
            return;
        }

        let logLevelString = "";
        switch (logLevel) {
            case PixeELogLevel.ERROR:
                logLevelString = "ERROR";
                break;
            case PixeELogLevel.INFO:
                logLevelString = "INFO";
                break;
            case PixeELogLevel.VERBOSE:
                logLevelString = "VERBOSE";
                break;
            case PixeELogLevel.WARNING:
                logLevelString = "WARNING";
                break;
        }

        let timestamp = this.clock.getElapsedTime();

        let finalMessage = "";
        if (this.timestamp) {
            finalMessage = this.clock.getElapsedTimeFormatted() + ", ";
        }

        if (this.singleLine) {
            finalMessage += `[${logLevelString}] ${source}: ${message}`;
        } else {
            finalMessage += `[${logLevelString}]\n${source}:\n${message}`;
        }

        console.log(finalMessage);
    };

    /**
     * @desc Used to log VERBOSE messages.
     * @param source 'Name' or identifier of the caller.
     * @param message The desired message.
     * @returns void
     */
    verbose(source, message) {
        this.log(source, message, PixeELogLevel.VERBOSE);
    };

    /**
     * @desc Used to log WARNING messages.
     * @param source 'Name' or identifier of the caller.
     * @param message The desired message.
     * @returns void
     */
    warning(source, message) {
        this.log(source, message, PixeELogLevel.WARNING);
    };

    /**
     * @desc Set the 'log level' of the logger.
     * @param newLogLevel The PixeELogLevel enum value of intended log level.
     * @returns void
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