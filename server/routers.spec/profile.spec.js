"use strict";
let chai = require("chai");
let expect = chai.expect;
let app = require("../server");
let Session = require("supertest-session")({
    app: app
});
let promisify = require("./promisify");
let mongoose = require("mongoose");

/*eslint-disable */
let newObjectId = () => mongoose.Types.ObjectId();
/*eslint-enable */

describe("/api/profile", () => {
    let sess = null;
    let login = () => promisify(
        sess.post("/api/auth/local")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({email: "chris.trevino@atsid.com", password: "abc123"})
            .expect(200));
    let makeSubscription = () => {
        return promisify(sess.post("/api/profile/subscriptions")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({splSetId: "arq-123"})
            .expect(201));
    };

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
            return login().then(makeSubscription)
                .then((res) => expect(res.body.splSetId).to.equal("arq-123"))
                .then(() => {
                    return promisify(sess.get("/api/profile/subscriptions")
                        .set("Accept", "application/json")
                        .expect(200));
                })
                .then((res) => expect(res.body.items.length > 0).to.be.true);
        });
        it("POST will emit a 400 Bad Request error if the splSetId is not present", () => {
            return login()
                .then(() => {
                    return promisify(sess.post("/api/profile/subscriptions")
                        .set("Content-Type", "application/json")
                        .set("Accept", "application/json")
                        .send({})
                        .expect(400));
                });
        });
        it("GET can accept a query argument to determine if a user has a subscription to a drug", () => {
            return login().then(makeSubscription)
                .then(() => {
                    return promisify(sess.get("/api/profile/subscriptions?splSetId=arq-123")
                        .set("Accept", "application/json")
                        .expect(200));
                })
                .then((res) => {
                    expect(res.body.items.length).to.equal(1);
                    expect(res.body.items[0].splSetId).to.equal("arq-123");
                });
        });

        describe("/subscriptions/:id", () => {
            it("GET will retrieve a subscription by ID", () => {
                return login()
                    .then(makeSubscription)
                    .then((res) => {
                        let id = res.body.id;
                        return promisify(sess.get(`/api/profile/subscriptions/${id}`)
                            .set("Accept", "application/json")
                            .expect(200));
                    })
                    .then((res) => expect(res.body.splSetId).to.equal("arq-123"));
            });

            it("GET will emit a 404 Not Found error if the ID is invalid", () => {
                return login().then(() => {
                    let id = newObjectId();
                    return promisify(sess.get(`/api/profile/subscriptions/${id}`)
                        .set("Accept", "application/json")
                        .expect(404));
                });
            });

            it("DELETE will delete a subscription", () => {
                let id = null;
                return login()
                    .then(makeSubscription)
                    .then((res) => id = res.body.id)
                    .then(() => promisify(sess.delete(`/api/profile/subscriptions/${id}`).expect(204)))
                    .then(() => promisify(sess.get(`/api/profile/subscriptions/${id}`).expect(404)));
            });

            it("DELETE will emit a 404 Not Found error if the ID is invalid", () => {
                return login().then(() => {
                    let id = newObjectId();
                    return promisify(sess.delete(`/api/profile/subscriptions/${id}`)
                        .expect(404));
                });
            });
        });
    });
});

