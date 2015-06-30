"use strict";
let { expect } = require("chai");
let rewire = require("rewire");
let handler = rewire("./encrypt_password_on_save");

describe("Encrypt Password On Save Handler", () => {
    afterEach(() => handler.__set__("passwordChecker", require("../../../../components/password_checker")));

    it("can encrypt a password when it changes", (done) => {
        let user = {
            password: "abc123",
            isModified: (field) => field === "password"
        };
        let next = () => {
            expect(user.password).to.not.equal("abc123");
            done();
        };
        return handler.apply(user, [next]);
    });

    it("will invoke next() if the password did not change", (done) => {
        let user = {
            password: "abc123",
            isModified: () => false
        };
        let next = () => {
            expect(user.password).to.equal("abc123");
            done();
        };
        return handler.apply(user, [next]);
    });

    it("will invoke the catch handler when an error is thrown", (done) => {
        let user = {
            password: "abc123",
            isModified: () => true
        };
        handler.__set__("passwordChecker", {
            encryptPassword: () => {
                throw new Error("Triggering a blowup");
            }
        });
        let next = (err) => {
            expect(err).to.be.ok;
            done();
        };
        return handler.apply(user, [next]);
    });
});
