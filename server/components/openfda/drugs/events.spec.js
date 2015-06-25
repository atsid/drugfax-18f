"use strict";

let Events = require("./events");
let chai = require("chai");
let expect = chai.expect;

describe("OpenFDAEvents", function() {
    describe("buildUrl", function() {
        it("buildUrl should return the correct path", function() {
            var service = new Events({
                path: ""
            });
            expect(service.buildUrl()).to.equal("/drug/event.json");
        });
    });
});
