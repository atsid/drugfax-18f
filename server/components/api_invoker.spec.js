"use strict";
let chai = require("chai");
let expect = chai.expect;
let invoker = require("./api_invoker");
let FakeApi = require("../components.spec/openfda_api_mock");

describe("The API Invoker", () => {
    describe("invoke", () => {
        it("can pass paging parameters to the openFDA API", () => {
            let api = new FakeApi();
            let req = {
                query: {
                    limit: 100,
                    skip: 10
                }
            };
            return invoker.invoke(api, req).then(() => {
                expect(api.limitVal).to.equal(100);
                expect(api.skipVal).to.equal(10);
            });
        });

        it("can prune result fields based on a fields parameter", () => {
            let api = new FakeApi();
            let req = {
                query: {
                    fields: "foo.bar,foo.baz"
                }
            };

            api.respondWith({
                meta: {
                    results: {
                        limit: 100,
                        skip: 200,
                        total: 1000
                    }
                },
                results: [
                    {
                        "foo": {
                            "bar": 1,
                            "baz": 1,
                            "bing": 2
                        },
                        "yoloswag": 2
                    }
                ]
            });

            return invoker.invoke(api, req).then((resp) => {
                expect(resp.meta.limit).to.equal(100);
                expect(resp.meta.skip).to.equal(200);
                expect(resp.meta.total).to.equal(1000);
                expect(resp.data.length).to.equal(1);
                expect(resp.data[0].foo).to.be.an.object;
                expect(resp.data[0].foo.bing).to.be.undefined;
                expect(resp.data[0].yoloswag).to.be.undefined;
            });
        });
    });

    describe("middleware", () => {
        it("emits an empty result object if no results are found", () => {
            let api = new FakeApi();
            api.respondWithError({ status: 404 });

            let result = null;
            let req = { query: {} };
            let res = {
                json: (sentJson) => result = sentJson,
                end: () => null
            };

            return invoker.middleware(api, req, res)
                .then(() => {
                    expect(result.meta.total).to.equal(0);
                    expect(result.data.length).to.equal(0);
                });
        });

        it("emits a generic error for unhandled errors", () => {
            let api = new FakeApi();
            api.respondWithError({});

            let result = null;
            let req = { query: {} };
            let res = {
                json: (sentJson) => result = sentJson,
                end: () => null
            };

            return invoker.middleware(api, req, res)
                .then(() => {
                    expect(result.error).to.equal("Unknown service error");
                });
        });

        it("emits API invocation results as JSON", () => {
            let api = new FakeApi();
            let req = {
                query: {
                    limit: 100,
                    skip: 10
                }
            };
            api.respondWith({
                meta: {
                    results: {}
                },
                results: [{a: 123}]
            });
            let result = null;
            let res = {
                json: (json) => result = json
            };
            return invoker.middleware(api, req, res).then(() => {
                expect(result.data[0].a).to.equal(123);
            });
        });
    });
});
