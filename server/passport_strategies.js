"use strict";
let passport = require("passport");
let config = require("config");
let debug = require("debug")("app:auth");
let FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret,
    callbackUrl: config.auth.facebook.callbackUrl,
    enableProof: false
}));

/*
passport.use(new LocalStrategy(localStrategyConfig, (req, email, password, done) => {
    debug('applying local-auth strategy');
    User.findOneQ({email: email.toLowerCase()})
        .then((user) => {
            if (!user) {
                throw new NotFoundError(`Could not find user ${email}`);
            }
            return user.populateQ("roles");
        })
        .then((user) => {
            if (!user) {
                done(null, false);
            } else {
                user.isValidPassword(password)
                    .then((isValid) => {
                        done(null, (isValid ? user : false));
                    })
                    .catch((err) => {
                        debug("Error performing basic auth", err);
                        done(null, false);
                    });
            }
        })
        .catch((err) => done(err));
})

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
 ;
 */
