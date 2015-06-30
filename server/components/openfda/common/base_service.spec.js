"use strict";
let rewire = require("rewire");
let BaseService = rewire("./base_service");
let chai = require("chai");
let expect = chai.expect;


describe("OpenFDABaseService", function() {
    function createService() {
        return new BaseService({ path: "Path1", apiKey: "FakeApiKey"}, "Path2");
    }

    describe("buildUrl", function() {
        it("should work when limit is set", function() {
            let result =
                createService()
                    .limit(2)
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&limit=2");
        });
        it("should work when skip is set", function() {
            let result =
                createService()
                    .skip(3)
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&skip=3");
        });
        it("should work when count is set", function() {
            let result =
                createService()
                    .count("test")
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&count=test");
        });
        it("should work when skip and limit are set", function() {
            let result =
                createService()
                    .skip(3)
                    .limit(2)
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&limit=2&skip=3");
        });
        it("should work when skip, limit, and count are set", function() {
            let result =
                createService()
                    .skip(3)
                    .limit(2)
                    .count("test")
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&limit=2&skip=3&count=test");
        });
        it("should work when skip, limit, and search are set", function() {
            let result =
                createService()
                    .skip(3)
                    .limit(2)
                    .search("test:yo").parent()
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&search=(test:yo)&limit=2&skip=3");
        });
        it("should work when skip, limit, count, and search are set", function() {
            let result =
                createService()
                    .skip(3)
                    .limit(2)
                    .count("test")
                    .search("test:yo").parent()
                    .buildUrl();
            expect(result).to.equal("Path1Path2?api_key=FakeApiKey&search=(test:yo)&limit=2&skip=3&count=test");
        });
        it("should return a search reference when search is called", function() {
            let result = createService().search();
            expect(result.and).to.exist;
        });
    });

    describe("limit", function() {
        it("should return the service after called", function() {
            let service = createService();
            expect(service.limit(2)).to.equal(service);
        });
    });

    describe("skip", function() {
        it("should return the service after called", function() {
            let service = createService();
            expect(service.skip(2)).to.equal(service);
        });
    });

    describe("run", function() {
        it("should call get on request", function() {
            let called = false;
            BaseService.__set__("request", {
                get: function() {
                    called = true;
                }
            });

            createService().run();

            expect(called).to.be.true;
        });

        it("should call get with the correct url", function() {
            let called = false;
            BaseService.__set__("request", {
                get: function(url) {
                    expect(url).to.equal("Path1Path2?api_key=FakeApiKey");
                    called = true;
                }
            });

            createService().run();

            expect(called).to.be.true;
        });

        it("success should be called when the service returned successfully", function() {
            BaseService.__set__("request", {
                get: function(url) {
                    expect(url).to.equal("Path1Path2?api_key=FakeApiKey");
                    return {
                        end: function (callback) {
                            callback(null, { ok: true, body: { testData: true }});
                        }
                    };
                }
            });

            return createService().run((data) => {
                expect(data).to.deep.equal({ testData: true });
            });
        });

        it("failure should be called when the service returned successfully", function() {
            BaseService.__set__("request", {
                get: function(url) {
                    expect(url).to.equal("Path1Path2?api_key=FakeApiKey");
                    return {
                        end: function (callback) {
                            callback({ error: "AHH" }, { ok: false });
                        }
                    };
                }
            });

            return createService().run().then(function() {}, (err) => {
                expect(err).to.deep.equal({ error: "AHH" });
            });
        });
    });
    describe("runRaw", function() {
        it("should call get on request", function() {
            let called = false;
            BaseService.__set__("request", {
                get: function() {
                    called = true;
                }
            });
            createService().runRaw();
            expect(called).to.be.true;
        });

        it("should call get with the correct url", function() {
            let called = false;
            BaseService.__set__("request", {
                get: function(url) {
                    expect(url).to.equal("Path1Path2?api_key=FakeApiKey");
                    called = true;
                }
            });
            createService().runRaw();
            expect(called).to.be.true;
        });
    });
});
