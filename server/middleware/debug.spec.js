"use strict";
let debug = require("./debug");
let chai = require("chai");
let expect = chai.expect;

describe("The Debug Middleware", () => {
    it("can send debug messages", (done) => {
        let callback = debug.send("derp");
        let sentJson = false;
        let res = {
            json: (data) => {
                sentJson = true;
                expect(data.message).to.equal("derp");
            },
            end: () => {
                expect(sentJson).to.be.true;
                done();
            }
        };
        callback({}, res);
    });
});
