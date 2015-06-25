"use strict";

let api = require("./api");
let chai = require("chai");
let expect = chai.expect;

describe("OpenFDAAPI", function() {
    describe("drugs", function() {
        it("should return an drugs object", function() {
            expect(api().drugs().run).to.exist;
        });
    });
});
