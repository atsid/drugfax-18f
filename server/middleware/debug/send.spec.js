"use strict";
let send = require("./send");
let chai = require("chai");
let expect = chai.expect;

describe("debug.send middleware", () => {
    it("can send debug messages", (done) => {
        let callback = send("derp");
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
