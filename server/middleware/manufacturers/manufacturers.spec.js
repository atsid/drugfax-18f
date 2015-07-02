"use strict";
let { expect, assert } = require("chai");
let manufacturers = require("./index").index;
let nock = require("nock");

describe("manufacturers", () => {
    let scope;
    beforeEach(() => {
        scope = nock("https://api.fda.gov");
        nock.cleanAll();
    });

    let doCall = () => {
        let myJson;
        return manufacturers({ query: {} }, {
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

    let mockDrugListApiCall = (data) => {
        scope
            .get(`/drug/label.json?count=openfda.manufacturer_name.exact`)
            .reply(200, {
                meta: {
                    results: {
                        total: data.length,
                        limit: 0,
                        skip: 0
                    }
                },
                results: data
            });
    };

    let mockDrugListApiError = (status) => {
        scope
            .get(`/drug/label.json?count=openfda.manufacturer_name.exact`)
            .reply(status);
    };

    let mockDrugListApi500Call = () => mockDrugListApiError(500);
    let mockDrugListApi404Call = () => mockDrugListApiError(404);

    it("should return data if just called", () => {
        let testData = [{ term: "1" }];
        mockDrugListApiCall(testData);
        return doCall().then((data) => {
            // Returns just the first result
            expect(data).to.deep.equal({
                meta: {
                    total: 1,
                    limit: 0,
                    skip: 0
                },
                data: [{
                    id: "1",
                    name: "1"
                }]
            });
        });
    });

    it("should return empty data if api service returns 404", () => {
        mockDrugListApi404Call();
        return doCall().then((data) => {
            expect(data.data.length).to.be.equal(0);
        });
    });

    it("should return error if api service returns 500", () => {
        mockDrugListApi500Call();
        return doCall().catch((err) => {
            expect(err.message).to.contain("OpenFDA API error");
        });
    });
});
