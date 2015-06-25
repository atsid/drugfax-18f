"use strict";
let chai = require("chai");
let expect = chai.expect;
let app = require("../server");
let Session = require("supertest-session")({
    app: app
});
let promisify = require("./promisify");

describe("/api/profile", () => {
    let sess = null;
    let login = () => promisify(
        sess.post("/api/auth/local")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({email: "chris.trevino@atsid.com", password: "abc123"})
            .expect(200));

    beforeEach(() => require("../startup_hooks").resolve());
    beforeEach(() => sess = new Session());
    afterEach(() => sess.destroy());

    it("GET emits a 401 unauthorized error if the user is not logged in", (done) => {
        sess.get("/api/profile").expect(401, done);
    });

    it("GET emits the current user if the user is logged in", () => {
        return login()
            .then(() => {
                return promisify(
                    sess.get("/api/profile")
                        .set("Accept", "application/json")
                        .expect(200));
            })
            .then((res) => expect(res.body.email).to.equal("chris.trevino@atsid.com"));
    });

    describe("/subscriptions", () => {
        it("POST will create a subscription", () => {
            return login()
                .then(() => {
                    return promisify(sess.post("/api/profile/subscriptions")
                        .set("Content-Type", "application/json")
                        .set("Accept", "application/json")
                        .send({splSetId: "arq-123"})
                        .expect(201));
                })
                .then((res) => expect(res.body.splSetId).to.equal("arq-123"));
        });
    });
});

