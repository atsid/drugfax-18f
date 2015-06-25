"use strict";
let chai = require("chai");
let expect = chai.expect;
let _ = require("lodash");
let sampleData = require("./sample_twitter_user");
let handler = require("./oauth_callback");
let hat = require("hat");

let generateProfile = () => {
    let data = _.clone(sampleData);
    data.id = "" + hat();
    return data;
};

let handle = (profile, done) => handler(null, null, profile, done);

describe("Twitter OAuth Callback", () => {
    describe("profile handling", () => {
        it("can create a facebook account for a user", () => {
            let userId = null;
            let onComplete = (err, user) => {
                userId = user.id;
                expect(err).to.be.null;
                expect(user.id).to.be.ok;
            };

            let secondComplete = (err, user) => {
                expect(err).to.be.null;
                expect(user.id).to.equal(userId);
            };

            let profile = generateProfile();
            return handle(profile, onComplete)
                .then(() => handle(profile, secondComplete));
        });
    });

    it("can handle an error", () => {
        let onComplete = (err, user) => {
            expect(err).to.be.ok;
            expect(user).to.be.null;
        };
        return handle({id: 1}, onComplete);
    });
});
