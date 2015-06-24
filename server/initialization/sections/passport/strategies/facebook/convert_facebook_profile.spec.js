"use strict";
let chai = require("chai");
let expect = chai.expect;
let convert = require("./convert_facebook_profile");
let profileData = require("./sample_facebook_user.json");
let User = require("../../../../../persistence").models.User;

describe("The profile converter function", () => {
    it("can convert a facebook profile", () => {
        let userData = convert(profileData);
        return User.createQ(userData).then((created) => {
            expect(created).to.be.ok;
            expect(created.name).to.equal("Christopher Trevino");
            expect(created.facebookId).to.equal("" + profileData.id);
            expect(created.password).to.be.ok;
        });
    });
});
