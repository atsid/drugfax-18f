"use strict";
let chai = require("chai");
let expect = chai.expect;
let convert = require("./convert_twitter_profile");
let profileData = require("./sample_twitter_user.json");
let User = require("../../../../../persistence").models.User;

describe("The Twitter profile converter function", () => {
    it("can convert a Twitter profile", () => {
        let userData = convert(profileData);
        return User.createQ(userData).then((created) => {
            expect(created).to.be.ok;
            expect(created.name).to.equal("Chris Trevino");
            expect(created.twitterId).to.equal("" + profileData.id);
            expect(created.password).to.be.ok;
        });
    });
});
