"use strict";

let Search = require("./search");
let chai = require("chai");
let expect = chai.expect;

describe("OpenFDASearch", function() {
    function createService() {
        return new Search({ path: "ParentPath1"});
    }

    describe("buildUrl", function() {
        it("should work when 'or' is called", function() {
            var result =
                createService()
                    .or("test:yo")
                    .buildUrl();
            expect(result).to.equal("(test:yo)");
        });
        it("should work when 'or' is called multiple times", function() {
            var result =
                createService()
                    .or("test:yo")
                    .or("test2:hi")
                    .buildUrl();
            expect(result).to.equal("(test:yo)+(test2:hi)");
        });
        it("should work when 'or' is called after a search", function() {
            var result =
                createService()
                    .search("test:yo")
                    .or("test2:hi")
                    .buildUrl();
            expect(result).to.equal("(test:yo)+(test2:hi)");
        });

        it("should work when 'and' is called", function() {
            var result =
                createService()
                    .and("test:yo")
                    .buildUrl();
            expect(result).to.equal("(test:yo)");
        });
        it("should work when 'and' is called multiple times", function() {
            var result =
                createService()
                    .and("test:yo")
                    .and("test2:hi")
                    .buildUrl();
            expect(result).to.equal("(test:yo)+AND+(test2:hi)");
        });
        it("should work when 'and' is called after a search", function() {
            var result =
                createService()
                    .search("test:yo")
                    .and("test2:hi")
                    .buildUrl();
            expect(result).to.equal("(test:yo)+AND+(test2:hi)");
        });

        it("should work when 'and' is called with an 'or'", function() {
            var result =
                createService()
                    .search("test:yo")
                    .and("test2:hi")
                    .or("test3:me")
                    .buildUrl();
            expect(result).to.equal("(test:yo)+AND+(test2:hi)+(test3:me)");
        });

        it("should work when 'or' is called with a group", function() {
            var result =
                createService()
                    .group("group1:1")
                        .and("group2:2")
                        .parent()
                    .or("test2:hi")
                    .buildUrl();
            expect(result).to.equal("((group1:1)+AND+(group2:2))+(test2:hi)");
        });

        it("should work when 'and' is called with a group", function() {
            var result =
                createService()
                    .group("group1:1")
                        .and("group2:2")
                        .parent()
                    .and("test2:hi")
                    .buildUrl();
            expect(result).to.equal("((group1:1)+AND+(group2:2))+AND+(test2:hi)");
        });
    });

    describe("parent", function() {
        it("calling parent should return the parent", function() {
            var service = createService();
            expect(service.parent().path).to.equal("ParentPath1");
        });
    });

    describe("search", function() {
        it("return itself when called", function() {
            var service = createService();
            expect(service.search()).to.equal(service);
        });
    });

    describe("or", function() {
        it("return itself when called", function() {
            var service = createService();
            expect(service.or()).to.equal(service);
        });
    });

    describe("and", function() {
        it("return itself when called", function() {
            var service = createService();
            expect(service.and()).to.equal(service);
        });
    });

    describe("group", function() {
        it("return a new instance when called", function() {
            var service = createService();
            var group = service.group();
            expect(group).to.not.equal(service);
            expect(group.search).to.exist;
        });
    });
});
