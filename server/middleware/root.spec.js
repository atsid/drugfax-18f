"use strict";
let root = require("./root");
let chai = require("chai");
let expect = chai.expect;

describe("The Root Middleware", () => {
    it("can emit the service status", (done) => {
        let sentJson = false;
        let res = {
            json: (data) => {
                sentJson = true;
                expect(data.status).to.equal("ok");
            },
            end: () => {
                expect(sentJson).to.be.true;
                done();
            }
        };
        root.get({}, res);
    });
});
