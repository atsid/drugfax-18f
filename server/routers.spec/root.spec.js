"use strict";
let chai = require("chai");
let expect = chai.expect;
let request = require("supertest");
let app = require("app/routers/root");

describe("The API Root", (done) => {
    it("is emits a root data payload", () => {
        request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                expect(err).to.be.undefined;
                expect(res.body.status).to.equal("ok");
                done();
            });
    });
});
