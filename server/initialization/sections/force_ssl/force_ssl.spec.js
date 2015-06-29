"use strict";
let chai = require("chai");
let expect = chai.expect;
let forceSsl = require("./force_ssl");

describe("The ForceSSL Handler", () => {
    it("does nothing if no headers are set", (done) => {
        let req = {headers: {}};
        let res = {
            redirect: () => {
                throw new Error("Did not expect redirect");
            }
        };
        let next = () => done();
        forceSsl(req, res, next);
    });

    it("adds https if x-forwarded-proto header is present", (done) => {
        let req = {
            url: "",
            headers: {
                "x-forwarded-proto": "http",
                host: "localhost:9000"
            }
        };
        let res = {
            redirect: (url) => {
                expect(url.indexOf("https")).to.equal(0);
                done();
            }
        };
        let next = () => {
            throw new Error("did not expect next to be called");
        };
        forceSsl(req, res, next);
    });
});

