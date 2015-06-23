"use strict";

require("../common.spec/spec.helpers.js");

var auth = require("../security/auth");
describe("Auth", function() {
    it("should set a demo user if the login method is 'demo'", function() {
        auth.login("demo");
        expect(auth.user).to.deep.equal({ name: "Demo User" });
    });

    it("should remove the user if the logout function is called", function() {
        auth.login("demo");
        auth.logout();
        expect(auth.user).to.not.exist;
    });
});
