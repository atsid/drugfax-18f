"use strict";
let chai = require("chai");
let expect = chai.expect;
let request = require("supertest");
let app = require("app/routers/auth");

describe("/api/auth", () => {
    it("is emits authentication details", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                let body = res.body;
                expect(err).to.be.null;
                expect(body.methods).to.be.an.array;
                expect(body.methods.length).to.be.greaterThan(0);
                expect(body.links).to.be.an.object;
                done();
            });
    });
});
