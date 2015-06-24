"use strict";

var { util } = require("../common.spec/spec.helpers.js");

let rewire = require("rewire");
describe("Auth", function() {

    var auth;
    beforeEach(function() {
        auth = rewire("../security/auth");
    });

    describe("isLoggedIn", function() {
        function replaceGetUserCall() {
            var promise = util.fakePromise();
            var userGetCalled = false;
            auth.__set__("utils", {
                getJSON: function(url) {
                    userGetCalled = true;
                    expect(url).to.contain("current");
                    return promise;
                }
            });

            auth.isLoggedIn();

            expect(userGetCalled).to.be.true;
            return promise;
        }

        it("should attempt to load from the services", function() {
            replaceGetUserCall();
        });

        it("should load the current user after the service returns", function() {
            var promise = replaceGetUserCall();

            promise.trigger({ ok: true, body: { email: "testemail" } });

            expect(auth.user.email).to.equal("testemail");
        });

        it("should not load the current user, if the service returns 404", function() {
            var promise = replaceGetUserCall();

            promise.trigger({ notFound: true, body: { email: "testemail" } });
            expect(auth.user).to.not.exist;
        });
    });

    describe("login", function() {
        function replaceUtilsPost(postCalledFn) {
            var postPromise = util.fakePromise();
            auth.__set__("utils", {
                postJSON: function(url, data) {
                    if (postCalledFn) {
                        postCalledFn(url, data);
                    }
                    return postPromise;
                }
            });
            return postPromise;
        }

        function doLoginWithDemoPost(postCalledFn) {
            var postAttempted = false;
            var promise = replaceUtilsPost(function(url, data) {
                expect(data.email).to.exist;
                postAttempted = true;

                if (postCalledFn) {
                    postCalledFn(url, data);
                }
            });

            auth.login("demo");

            expect(postAttempted).to.be.true;

            return promise;
        }

        function doLoginWithDemoPostAndLoginPost() {
            var userData;
            var createPromise = doLoginWithDemoPost(function (url, data) {
                userData = data;
            });
            var loginCalled = false;
            var loginPromise = replaceUtilsPost(function (loginUrl, loginData) {
                loginCalled = true;
                expect(loginUrl).to.contain("auth/local");
                expect(loginData.email).to.equal(userData.email);
            });

            createPromise.trigger({ ok: true, body: userData });
            loginPromise.trigger({ ok: true, body: userData });

            expect(loginCalled).to.be.true;
        }


        it("should attempt to create an new demo user", function() {
            doLoginWithDemoPost();
        });

        it("should set a demo user if the login method is 'demo'", function() {
            doLoginWithDemoPostAndLoginPost();

            expect(auth.user.email).to.contain("demo");
        });

        it("should remove the user if the logout function is called", function() {
            doLoginWithDemoPostAndLoginPost();

            auth.logout();
            expect(auth.user).to.not.exist;
        });
    });
});
