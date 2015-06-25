"use strict";
let chai = require("chai");
let expect = chai.expect;
let handler = require("./error_handler");

describe("the common error handler", () => {
    it("will delete passwords from the request body to prevent them from leaking out", (done) => {
        let req = { body: { password: "elmo" }};
        let sent = null;
        let statusCode = 0;
        let next = () => {
            expect(req.password).to.be.undefined;
            expect(statusCode).to.equal(500);
            expect(sent).to.be.ok;
            done();
        };
        let res = {};
        res.status = (status) => {
            statusCode = status;
            return res;
        };
        res.send = (data) => sent = data;
        handler(new Error(), req, res, next);
    });
});
