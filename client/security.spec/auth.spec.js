"use strict";

var { util } = require("../common.spec/spec.helpers.js");
let nock = require("nock");
let auth = require("../security/auth");

describe("Auth", function() {

    let scope = nock("http://localhost");

    beforeEach(function() {
        auth.logout();
    });

    describe("isLoggedIn", function() {

        it("should attempt to load from the services", function(done) {

            scope.get("/api/auth/current").reply(404);

            auth.isLoggedIn().then((res) => {
                expect(res).to.equal(false);
                done();
            }).then(null, (err) => {
                done(err);
            });
        });

        it("should load the current user after the service returns", function(done) {

            scope.post("/api/users").reply(201, { email: "testemail" });
            scope.post("/api/auth/local").reply(201, { email: "testemail" });

            auth.login("demo").then(() => {
                expect(auth.user.email).to.equal("testemail");
                done();
            }).then(null, (err) => {
                done(err);
            });
        });

        it("should not load the current user, if the service returns 404", function(done) {

            scope.post("/api/auth/current").reply(404);

            auth.isLoggedIn("demo").then(() => {
                expect(auth.user).to.not.exist;
                done();
            }).then(null, (err) => {
                done(err);
            });
        });
    });

    describe("login", function() {


        it("should attempt to create an new demo user", function(done) {
            scope
                .post("/api/users", function(body) {
                    expect(body.email).to.contain("demo");
                    done();
                    return true;
                })
                .reply(201, { email: "demo" });

            scope.post("/api/auth/local").reply(201, { email: "testemail" });

            auth.login("demo").then(() => {
                expect(auth.user.email).to.equal("testemail");
            }).then(null, (err) => {
                done(err);
            });
        });

        it("should set a demo user if the login method is 'demo'", function(done) {
            let ctjson = {"Content-Type": "application/json"};
            let passThrough = (uri, requestBody) => {
                return requestBody;
            };

            scope.post("/api/users").reply(201, passThrough, ctjson);
            scope.post("/api/auth/local").reply(201, passThrough, ctjson);

            auth.login("demo").then(() => {
                expect(auth.user.email).to.contain("demo");
                done();
            }).then(null, (err) => {
                done(err);
            });
        });

        it("should remove the user if the logout function is called", function(done) {
            scope.post("/api/users").reply(201, { email: "testemail" });
            scope.post("/api/auth/local").reply(201, { email: "testemail" });

            auth.login("demo").then(() => {
                expect(auth.user).to.exist;
                auth.logout();
                expect(auth.user).to.not.exist;
                done();
            }).then(null, (err) => {
                done(err);
            });


        });
    });
});
