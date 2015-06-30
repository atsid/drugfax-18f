"use strict";

let chai = require("chai");
let expect = chai.expect;
let manufacturerStats = require("./manufacturer_stats");
let nock = require("nock");

describe("Manufacturer stats", function() {
    let scope;
    beforeEach(function() {
        scope = nock("https://api.fda.gov");
        nock.cleanAll();
    });

    function mockDrugCountApiCall(name, data) {
        scope
            .get(`/drug/label.json?search=(openfda.manufacturer_name%3A%22${name}%22)&limit=1000&count=openfda.spl_set_id.exact`)
            .reply(200, {
                results: data
            });
    }

    function mockDrugCountApi404Call(name) {
        scope
            .get(`/drug/label.json?search=(openfda.manufacturer_name%3A%22${name}%22)&limit=1000&count=openfda.spl_set_id.exact`)
            .reply(404);
    }

    function mockDrugStatApiCall(name, data) {
        scope
            .get(`/drug/enforcement.json?search=(openfda.manufacturer_name%3A%22${name}%22)&count=classification.exact`)
            .reply(200, {
                results: data
            });
    }

    function mockDrugStatApi404Call(name) {
        scope
            .get(`/drug/enforcement.json?search=(openfda.manufacturer_name%3A%22${name}%22)&count=classification.exact`)
            .reply(404);
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

    it("should return a 100% grade if the manufacturer has drugs but no recalls", function() {
        let testName = "TESTER";
        mockDrugCountApiCall(testName, [1]);
        mockDrugStatApi404Call(testName);
        return manufacturerStats(testName).then((data) => {
            expect(data.totalDrugs).to.equal(1);
            expect(data.grade).to.equal(100);
        });
    });

    it("should return a 100% grade if the manufacturer has drugs but no recalls", function() {
        let testName = "TESTER";
        mockDrugCountApiCall(testName, [1]);
        mockDrugStatApi404Call(testName);
        return manufacturerStats(testName).then((data) => {
            expect(data.totalDrugs).to.equal(1);
            expect(data.grade).to.equal(100);
        });
    });

    it("should return a 100% grade if the manufacturer has no drugs and no recalls", function() {
        let testName = "TESTER";
        mockDrugCountApi404Call(testName);
        mockDrugStatApi404Call(testName);
        return manufacturerStats(testName).then((data) => {
            expect(data.totalDrugs).to.equal(0);
            expect(data.grade).to.equal(100);
        });
    });

    it("should scrub commas from manufacturer name when getting manufacturer info", function() {
        let testNameWithCommas = "T,E,S,T,E,R";
        let testName = "TESTER";
        mockDrugCountApi404Call(testName);
        mockDrugStatApi404Call(testName);
        return manufacturerStats(testNameWithCommas).then((data) => {
            expect(data.totalDrugs).to.equal(0);
            expect(data.grade).to.equal(100);
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
