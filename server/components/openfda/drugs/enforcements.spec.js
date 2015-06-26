"use strict";

let Enforcements = require("./enforcements");
let chai = require("chai");
let expect = chai.expect;

describe("OpenFDADrugEnforcements", function() {
    describe("buildUrl", function() {
        it("should return the correct path", function() {
            var service = new Enforcements({
                path: ""
            });
            expect(service.buildUrl()).to.equal("/drug/enforcement.json");
        });
    });
});
