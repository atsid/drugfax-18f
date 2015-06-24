"use strict";
module.exports = {
    /**
     * The user's email address, which is their unique login
     */
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            dropDups: true
        }
    },

    /**
     * A name by which we can address the user
     */
    name: {
        first: {
            type: String
        },
        last: {
            type: String
        }
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
