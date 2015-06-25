"use strict";
let convert = require("./convert_facebook_profile");
let commonOAuth = require("../common_oauth_callback");
let findProfile = (profile) => {
    return { facebookId: "" + profile.id };
};
module.exports = commonOAuth(findProfile, convert, "Twitter");
