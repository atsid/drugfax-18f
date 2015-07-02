"use strict";

class OpenFDABadRequest extends Error {
    constructor (openFDAError) {
        super();

        let apiError = {};
        if (openFDAError && openFDAError.error) {
            apiError = openFDAError.error;
        }
        this.message = "OpenFDA API error: (" + (apiError.code || "Unknown code") + ": " + (apiError.message || "No Message") + ")";
        this.httpStatus = 400;
    }
}
module.exports = OpenFDABadRequest;
