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
                console.log("INSPECTING", body);
                expect(body.status).to.equal("ok");
                expect(err).to.be.null;
                done();
            });
    });
});
