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
     * The user password, encrypted
     */
    password: {
        type: String,
        required: true
    }
};
