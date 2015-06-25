"use strict";
let chai = require("chai");
let expect = chai.expect;
let request = require("supertest");
let app = require("../server");

describe("/users", () => {
    beforeEach(() => require("../startup_hooks").resolve());

    it("GET will emit the user index", (done) => {
        request(app)
            .get("/api/users")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.options).to.be.ok;
                expect(res.body.links).to.be.ok;
                done();
            });
    });

    it("POST will create a new user", (done) => {
        request(app)
            .post("/api/users")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({email: "joe.newuser@gmail.com", password: "funky_business"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.email).to.equal("joe.newuser@gmail.com");
                expect(res.body.password).to.be.undefined;

                request(app)
                    .post("/api/auth/local")
                    .send({email: "joe.newuser@gmail.com", password: "funky_business"})
                    .expect(200, done);
            });
    });

    describe("/:id", () => {
        it("GET will return a 404 if a user cannot be found", (done) => {
            request(app)
                .post("/api/users/derp")
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .expect(404, done);
        });

        it("GET will return a user if the user exists", (done) => {
            request(app)
                .post("/api/users")
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .send({email: "joe.newuser2@gmail.com", password: "funky_business"})
                .end((err, res) => {
                    expect(err).to.be.null;
                    let newUser = res.body;

                    request(app)
                        .get(`/api/users/${newUser.id}`)
                        .expect(200)
                        .end((err2, res2) => {
                            expect(err2).to.be.null;
                            expect(res2.body.email).to.equal("joe.newuser2@gmail.com");
                            done();
                        });
                });
        });
    });
});
