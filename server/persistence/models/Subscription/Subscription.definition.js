"use strict";
let Schema = require("../../mongoose").Schema;

module.exports = {
    /**
     * The user's email address, which is their unique login
     */
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    /**
     * The Label-Set of the Drug Being Subscribed to
     */
    splSetId: {
        type: String
    }
};
