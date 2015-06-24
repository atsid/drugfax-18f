"use strict";
let chai = require("chai");
let expect = chai.expect;
let app = require("../server");
let Session = require("supertest-session")({
    app: app
});

describe("/api/auth", () => {
    let sess = null;
    beforeEach(() => require("app/startup_hooks").resolve());
    beforeEach(() => sess = new Session());
    afterEach(() => sess.destroy());

    it("GET emits authentication details", (done) => {
        sess.get("/api/auth/")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                let body = res.body;
                expect(err).to.be.null;
                expect(body.options).to.be.an.array;
                expect(body.options.length).to.be.greaterThan(0);
                expect(body.links).to.be.an.object;
                done();
            });
    });

    describe("/current", () => {
        it("GET will emit a 404 if the client is not authenticated", (done) => {
            sess
                .get("/api/auth/current")
                .expect(404)
                .expect("Content-Type", /json/)
                .end((err) => {
                    expect(err).to.be.null;
                    done();
                });
        });
    });

    describe("/local", () => {
        it("POST can authenticate a user", (done) => {
            let checkAuthResponse = (err, res) => {
                expect(err).to.be.null;
                expect(res.body.email).to.equal("chris.trevino@atsid.com");
                expect(res.body.password).to.be.undefined;
            };

            sess.post("/api/auth/local")
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send({email: "chris.trevino@atsid.com", password: "abc123"})
                .expect(200, (err, res) => {
                    checkAuthResponse(err, res);

                    sess.get("/api/auth/current")
                        .set("Accept", "application/json")
                        .expect(200, (err2, res2) => {
                            checkAuthResponse(err2, res2);
                            done();
                        });
                });
        });
        it("POST will reject a user with an unknown email address", (done) => {
            sess.post("/api/auth/local")
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send({email: "chris.trevino@malicious_users.com", password: "abc123"})
                .expect(401, done);
        });
        it("POST will reject a user with a bad password", (done) => {
            sess.post("/api/auth/local")
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send({email: "chris.trevino@atsid.com", password: "BOGUS_PASSWORD"})
                .expect(401, done);
        });
    });
});
