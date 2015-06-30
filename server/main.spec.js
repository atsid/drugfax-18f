"use strict";
let {expect} = require("chai");
let main = require("./main");

describe("The 'main' driver", () => {
    it("has a start function", () => {
        expect(main.start).to.be.a.function;
    });

    it("can start up a web server", () => {
        return main.start()
            .then((result) => expect(result).to.be.ok);
    });
});
