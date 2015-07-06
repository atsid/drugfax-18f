"use strict";
let { expect, assert } = require("chai");
let nock = require("nock");
let service = require("./get_drug_stats_by_spl_set_id");

describe.only("get_drug_stats_by_spl_set_id", () => {
    let scope;

    beforeEach(() => {
        scope = nock("https://api.fda.gov");
        nock.cleanAll();
    });

    let doCall = (setId) => {
        let myJson;
        return service({ params: { splSetId: setId }, query: {} }, {
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

    let mockCall = (url, setId, data) => {
        scope
            .get(url.replace("$$SETID$$", setId))
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

    let mockDrugTotalEventsCall =
        mockCall.bind(this, "/drug/event.json?search=((patient.drug.openfda.spl_set_id%3D%22$$SETID$$%22))&count=patient.reaction.reactionmeddrapt.exact");

    let mockSexEventsCall =
        mockCall.bind(this, "/drug/event.json?search=((patient.drug.openfda.spl_set_id%3D%22$$SETID$$%22))&count=patient.patientsex");

    let mockDeathEventsCall =
        mockCall.bind(this, "/drug/event.json?search=((patient.drug.openfda.spl_set_id%3D%22$$SETID$$%22)%20AND%20(patient.reaction.reactionmeddrapt%3Adeath))&count=patient.reaction.reactionmeddrapt.exact");

    let mockAllCalls = (setId, totalEventsData, sexEventsData, deathEventsData) => {
        mockDrugTotalEventsCall(setId, totalEventsData);
        mockSexEventsCall(setId, sexEventsData);
        mockDeathEventsCall(setId, deathEventsData);
    };

    let mockDrugTotalEventsError = (setId, status) => {
        scope
            .get(`/drug/event.json?search=((patient.drug.openfda.spl_set_id%3D%22${setId}%22))&count=patient.reaction.reactionmeddrapt.exact`)
            .reply(status);
    };

    it("should return data if just called", () => {
        let setId = "TEST_ID";
        let sexEventsData = [{ term: "2", count: 4 }, { term: "1", count: 2 }];
        mockAllCalls(setId, [{ term: "HAHA", count: 2 }], sexEventsData, [{ term: "DEATH", count: 80000 }]);
        return doCall(setId).then((data) => {
            expect(data).to.deep.equal({
                "sexEvents": [
                    {
                        "count": 4,
                        "sex": "F"
                    },
                    {
                        "count": 2,
                        "sex": "M"
                    }
                ],
                "topEvents": [
                    {
                        "count": 2,
                        "event": "HAHA"
                    }
                ],
                "totalDeaths": 80000
            });
        });
    });

    it("should return empty data if api service returns 404", () => {
        let setId = "TEST_ID";
        mockDrugTotalEventsError(setId, 404);
        return doCall(setId).then((data) => {
            expect(data.data.length).to.be.equal(0);
        });
    });

    it("should return error if api service returns 500", () => {
        let setId = "TEST_ID";
        mockDrugTotalEventsError(setId, 500);
        return doCall(setId).catch((err) => {
            expect(err.message).to.contain("OpenFDA API error");
        });
    });
});
