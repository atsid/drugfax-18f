"use strict";
let passport = require("passport");
let localStrategy = require("./strategies/local");
let persistence = require("app/persistence");
let User = persistence.models.User;

module.exports = {
    name: "passport",
    configure(app) {
        passport.use(localStrategy());
        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

        app.use(passport.initialize());
        app.use(passport.session());
    }
};
