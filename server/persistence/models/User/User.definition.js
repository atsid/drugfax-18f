"use strict";
module.exports = {
    /**
     * The user's email address, which is their unique login
     */
    email: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },

    /**
     * A name by which we can address the user
     */
    name: {
        type: String
    },

    /**
     * The user password, encrypted
     */
    password: {
        type: String,
        required: true
    },

    /**
     * A user's unique Facebook profile ID
     */
    facebookId: {
        type: String
    },

    /**
     * A user's unique Twitter profile ID
     */
    twitterId: {
        type: String
    }
};
