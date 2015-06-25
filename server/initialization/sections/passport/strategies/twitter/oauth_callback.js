"use strict";
let convert = require("./convert_twitter_profile");
let commonOAuth = require("../common_oauth_callback");
let findProfile = (profile) => {
    return { twitterId: "" + profile.id };
};
module.exports = commonOAuth(findProfile, convert, "Twitter");
