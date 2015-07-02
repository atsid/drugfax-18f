"use strict";
let { expect, assert } = require("chai");
let getManufacturerByNameImpl = require("./get_manufacturer_by_name");
let nock = require("nock");

describe("get_manufacturer_by_name", () => {
    let scope;
    beforeEach(() => {
        scope = nock("https://api.fda.gov");
        nock.cleanAll();
    });

    let doGetManufacturerByName = (name) => {
        let myJson;
        return getManufacturerByNameImpl({ query: { name: name }}, {
            json(value) {
                myJson = value;
            },
            send(value) {
                myJson = value;
            }
        }).then(() => {
            return myJson;
        });
    };

    let mockDrugCountApiCall = (name, data) => {
        scope
            .get(`/drug/label.json?search=(openfda.manufacturer_name%3A%22${name}%22)&limit=1000&count=openfda.spl_set_id.exact`)
            .reply(200, {
                results: data
            });
    };

    let mockDrugStatApiCall = (name, data) => {
        scope
            .get(`/drug/enforcement.json?search=(openfda.manufacturer_name%3A%22${name}%22)&count=classification.exact`)
            .reply(200, {
                results: data
            });
    };

    let mockDrugCountApiError = (name, status) => {
        scope
            .get(`/drug/label.json?search=(openfda.manufacturer_name%3A%22${name}%22)&limit=1000&count=openfda.spl_set_id.exact`)
            .reply(status);
    };

    let mockDrugStatApiError = (name, status) => {
        scope
            .get(`/drug/enforcement.json?search=(openfda.manufacturer_name%3A%22${name}%22)&count=classification.exact`)
            .reply(status);
    };

    let mockDrugCountApi400Call = (name) => mockDrugCountApiError(name, 400);
    let mockDrugStatApi400Call = (name) => mockDrugStatApiError(name, 400);

    it("should return a 50% grade if the manufacturer has 10 drugs and 5 recalls", () => {
        let testName = "TESTER";
        mockDrugCountApiCall(testName, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        mockDrugStatApiCall(testName, [{ term: "Class I", count: 1 }, { term: "Class II", count: 4 }]);
        return doGetManufacturerByName(testName).then((data) => {
            expect(data.stats.totalDrugs).to.equal(10);
            expect(data.stats.grade).to.equal(50);
        });
    });

    it("should emit an when the source error code is not a 404", () => {
        let testName = "TESTER";
        mockDrugCountApi400Call(testName);
        mockDrugStatApi400Call(testName);
        return doGetManufacturerByName(testName)
            .then(() => assert.fail("did not expect to pass"))
            .catch((err) => {
                expect(err.message).to.contain("OpenFDA API error");
            });
    });
});
