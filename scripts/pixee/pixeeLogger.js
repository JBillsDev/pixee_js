// @desc Enumerations specifying the various 'levels' of logging supported by PixeE.
export const PixeELogLevels = Object.freeze({
    VERBOSE: Symbol("VERBOSE"),
    INFO: Symbol("INFO"),
    WARNING: Symbol("WARNING"),
    ERROR: Symbol("ERROR")
});

// @desc Logging class to assist with console debugging.
export class PixeELogger {
    constructor() {
        // Set the default log level to 'INFO'.
        this.logLevel = PixeELogLevels.INFO;
    };
}