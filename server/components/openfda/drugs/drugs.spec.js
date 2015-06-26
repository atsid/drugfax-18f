"use strict";

let Drugs = require("./drugs");
let chai = require("chai");
let expect = chai.expect;

describe("OpenFDADrugs", function() {
    describe("events", function() {

        it("should return an events object", function() {
            var service = new Drugs({});
            expect(service.events().run).to.exist;
        });
    });

    describe("enforcements", function() {

        it("should return an enforcements object", function() {
            var service = new Drugs({});
            expect(service.enforcements().run).to.exist;
        });
    });


    describe("buildUrl", function() {
        it("should return the correct path", function() {
            var service = new Drugs({
                path: ""
            });
            expect(service.buildUrl()).to.equal("/drug/label.json");
        });
    });
});
