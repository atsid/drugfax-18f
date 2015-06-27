"use strict";
let chai = require("chai");
let expect = chai.expect;
let applyFields = require("./apply_fields");

describe("The ApplyFields function", () => {
    it("can cull top-level fields", () => {
        let fields = {
            "a": true,
            "b.c": true
        };

        let data = {
            "a": 1,
            "z": 2
        };

        let result = applyFields(fields, data);
        expect(result.a).to.equal(1);
        expect(result.z).to.be.undefined;
    });

    it("can cull nested fields", () => {
        let fields = {
            "a": true,
            "b.c": true
        };

        let data = {
            "a": 3,
            "b": {
                "c": 1,
                "z": 2
            }
        };
        let result = applyFields(fields, data);
        expect(result.a).to.equal(3);
        expect(result.b.c).to.equal(1);
        expect(result.b.z).to.be.undefined;
    });
});
