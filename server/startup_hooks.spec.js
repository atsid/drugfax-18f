"use strict";
var startupHooks = require("./startup_hooks"),
    Bluebird = require("bluebird");

describe("The startup hook manager", () => {

    it("can accept an incoming startup hook promise", (done) => {
        startupHooks.addHook(Bluebird.resolve(1));
        startupHooks.resolve()
            .then(() => done())
            .catch((err) => done(err));
    });
});
