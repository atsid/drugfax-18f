"use strict";
let redirect = require("./redirect");
let { expect } = require("chai");

describe("Redirect Middleware", () => {
    it("can redirect a response", () => {
        let req = {};
        let res = {
          redirect: (location) => expect(location).to.equal("www.google.com")
        };
        redirect("www.google.com")(req, res);
    });
});
