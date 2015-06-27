"use strict";
let Bluebird = require("bluebird");

class OpenFdaMock {
    constructor() {
        this.responseVal = {results: []};
    }

    search(val) {
        this.searchVal = val;
        return this;
    }

    parent() {
        return this;
    }

    limit(val) {
        this.limitVal = val;
        return this;
    }

    skip(val) {
        this.skipVal = val;
        return this;
    }

    respondWith(val) {
        this.responseVal = val;
        return this;
    }

    respondWithError(val) {
        this.errorVal = val;
        return this;
    }

    run() {
        if (this.errorVal) {
            return Bluebird.reject(this.errorVal);
        } else {
            return Bluebird.cast(this.responseVal);
        }
    }
}

module.exports = OpenFdaMock;
