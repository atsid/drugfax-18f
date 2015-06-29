"use strict";
let chai = require("chai");
let { expect, assert } = chai;
let { util } = require("../common.spec/spec.helpers.js");
let nock = require("nock");
let auth = require("../security/auth");

describe("Auth", function() {

    let scope;
    beforeEach(function() {
        scope = nock("http://localhost");
        auth.logout();
    });

    describe("isLoggedIn", function() {

        it("should attempt to load from the services", function() {

            scope.get("/api/auth/current").reply(404);

            return auth.isLoggedIn().then((res) => {
                expect(res).to.equal(false);
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should load the current user, if the service returns 200", function() {

            scope.get("/api/auth/current").reply(200, { email: "testemail" });

            return auth.isLoggedIn().then((loggedIn) => {
                expect(auth.user).to.exist;
                expect(loggedIn).to.be.true;
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should return the current logged in user if the user has already been loaded from the server", function() {

            scope.get("/api/auth/current").once().reply(200, { email: "testemail" });

            // Call it the first time
            return auth.isLoggedIn().then(() => {

                // Call it the second time, make sure it returns the correct user
                return auth.isLoggedIn().then((res) => {
                    expect(res).to.equal(true);
                }, (err) => {
                    assert.fail(err);
                });
            });
        });

        it("should load the current user after the service returns", function() {

            scope.post("/api/users").reply(201, { email: "testemail" });
            scope.post("/api/auth/local").reply(201, { email: "testemail" });

            return auth.login("demo").then(() => {
                expect(auth.user.email).to.equal("testemail");
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should not load the current user, if the service returns 404", function() {

            scope.post("/api/auth/current").reply(404);

            return auth.isLoggedIn("demo").then(() => {
                expect(auth.user).to.not.exist;
            }, (err) => {
                assert.fail(err);
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
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should set a demo user if the login method is 'demo'", function() {
            let ctjson = {"Content-Type": "application/json"};
            let passThrough = (uri, requestBody) => {
                return requestBody;
            };

            scope.post("/api/users").reply(201, passThrough, ctjson);
            scope.post("/api/auth/local").reply(201, passThrough, ctjson);

            return auth.login("demo").then(() => {
                expect(auth.user.email).to.contain("demo");
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should remove the user if the logout function is called", function() {
            scope.post("/api/users").reply(201, { email: "testemail" });
            scope.post("/api/auth/local").reply(201, { email: "testemail" });

            return auth.login("demo").then(() => {
                expect(auth.user).to.exist;
                auth.logout();
                expect(auth.user).to.not.exist;
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should return false if the users service return an error status", function() {
            scope.post("/api/users").reply(400);

            return auth.login("demo").then((success) => {
                expect(success).to.be.false;
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should return false if the users service return an non 'ok' status", function() {
            scope.post("/api/users").reply(204);

            return auth.login("demo").then((success) => {
                expect(success).to.be.false;
            }, (err) => {
                assert.fail(err);
            });
        });

        it("should return false if the auth service return an error status", function() {
            scope.post("/api/users").reply(201, { email: "testemail" });
            scope.post("/api/auth/local").reply(400);

            return auth.login("demo").then((success) => {
                expect(success).to.be.false;
            }, (err) => {
                assert.fail(err);
            });
        });


        it("should set window.location to the oauth provider if logging in with an oauth provider", function() {
            auth.login("testOAuth");

            expect(window.location.href).to.contain("/api/auth/testOAuth");
        });
    });
});
