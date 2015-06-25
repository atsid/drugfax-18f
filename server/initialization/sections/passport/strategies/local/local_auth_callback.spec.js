"use strict";
let chai = require("chai");
let expect = chai.expect;
let callback = require("./local_auth_callback");

describe("local authentication callback", () => {
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
});
