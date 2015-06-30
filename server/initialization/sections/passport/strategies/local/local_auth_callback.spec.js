"use strict";
let chai = require("chai");
let expect = chai.expect;
let rewire = require("rewire");
let callback = rewire("./local_auth_callback");

describe("local authentication callback", () => {
    beforeEach(() => require("../../../../../startup_hooks").resolve());

    it("can authenticate a user with email and password", () => {
        let onComplete = (err, user) => {
            expect(err).to.be.null;
            expect(user.email).to.equal("chris.trevino@atsid.com");
        };
        return callback("chris.trevino@atsid.com", "abc123", onComplete);
    });

    it("will reject a user with a bad password", () => {
        let onComplete = (err, user) => {
            expect(err).to.be.null;
            expect(user).to.be.false;
        };
        return callback("chris.trevino@atsid.com", "bad_password", onComplete);
    });

    it("will reject a user who is not in the system", () => {
        let onComplete = (err, user) => {
            expect(err).to.be.null;
            expect(user).to.be.false;
        };
        return callback("non.user@bogus.com", "bad_password", onComplete);
    });

    it("will invoke done with an error in case of an error", (done) => {
        callback.__with__({
            "User": {
                findOneQ: () => {
                    throw new Error("throwing intentional error");
                }
            }
        })(() => {
            let onComplete = (err) => {
                expect(err).to.be.ok;
                done();
            };
            callback("herp@derp.com", "abc123", onComplete);
        });
    });
});
