"use strict";
let { expect, assert } = require("chai");
let getDrugBySplSetId = require("./get_drug_by_spl_set_id");
let nock = require("nock");

describe("get_drug_by_spl_set_id", () => {
    let scope;
    beforeEach(() => {
        scope = nock("https://api.fda.gov");
        nock.cleanAll();
    });

    let doGetDrugBySplSetId = (setId) => {
        let myJson;
        return getDrugBySplSetId({ params: { splSetId: setId }, query: {} }, {
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

    let mockDrugListApiCall = (setId, data) => {
        scope
            .get(`/drug/label.json?search=(openfda.spl_set_id%3D%22${setId}%22)`)
            .reply(200, {
                results: data
            });
    };

    let mockDrugListApiError = (setId, status) => {
        scope
            .get(`/drug/label.json?search=(openfda.spl_set_id%3D%22${setId}%22)`)
            .reply(status);
    };

    let mockDrugListApi500Call = (setId) => mockDrugListApiError(setId, 500);
    let mockDrugListApi404Call = (setId) => mockDrugListApiError(setId, 404);

    it("should return data if just called", () => {
        let setId = "TEST_ID";
        let testData = [1, 2, 3, 4];
        mockDrugListApiCall(setId, testData);
        return doGetDrugBySplSetId(setId).then((data) => {
            // Returns just the first result
            expect(data).to.deep.equal(1);
        });
    });

    it("should return empty data if api service returns 404", () => {
        let setId = "TEST_ID";
        mockDrugListApi404Call(setId);
        return doGetDrugBySplSetId(setId).then((data) => {
            expect(data.data.length).to.be.equal(0);
        });
    });

    it("should return error if api service returns 500", () => {
        let setId = "TEST_ID";
        mockDrugListApi500Call(setId);
        return doGetDrugBySplSetId(setId).catch((err) => {
            expect(err.message).to.contain("OpenFDA API error");
        });
    });
});
