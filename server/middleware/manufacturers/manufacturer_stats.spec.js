"use strict";

let chai = require("chai");
let expect = chai.expect;
let manufacturerStats = require("./manufacturer_stats");
let nock = require("nock");

describe("Manufacturer stats", function() {
    let scope;
    beforeEach(() => scope = nock("https://api.fda.gov"));

    function mockDrugCountApiCall(name, data) {
        scope
            .get(`/drug/label.json?search=(openfda.manufacturer_name%3A%22${name}%22)&limit=1000&count=openfda.spl_set_id.exact`)
            .reply(200, {
                results: data
            });
    }

    function mockDrugStatApiCall(name, data) {
        scope
            .get(`/drug/enforcement.json?search=(openfda.manufacturer_name%3A%22${name}%22)&count=classification.exact`)
            .reply(200, {
                results: data
            });
    }

    it("should return a 50% grade if the manufacturer has 10 drugs and 5 recalls", function() {
        let testName = "TESTER";
        mockDrugCountApiCall(testName, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        mockDrugStatApiCall(testName, [{ term: "Class I", count: 1 }, { term: "Class II", count: 4 }]);
        return manufacturerStats(testName).then((data) => {
            expect(data.totalDrugs).to.equal(10);
            expect(data.grade).to.equal(50);
        });
    });

    it("should return a 0% grade if the manufacturer has less drugs and than recalls", function() {
        let testName = "TESTER";
        mockDrugCountApiCall(testName, [1]);
        mockDrugStatApiCall(testName, [{ term: "Class I", count: 1 }, { term: "Class II", count: 4 }]);
        return manufacturerStats(testName).then((data) => {
            expect(data.totalDrugs).to.equal(1);
            expect(data.grade).to.equal(0);
        });
    });

    it("should return classifications", function() {
        let testName = "TESTER";
        mockDrugCountApiCall(testName, [1]);
        mockDrugStatApiCall(testName, [{ term: "Class I", count: 1 }, { term: "Class II", count: 4 }]);
        return manufacturerStats(testName).then((data) => {
            expect(data.classificationCounts).to.deep.equal({
                "class_i": 1,
                "class_ii": 4
            });
            expect(data.totalIncidents).to.equal(5);
        });
    });
});
