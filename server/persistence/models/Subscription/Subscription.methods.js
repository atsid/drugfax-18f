"use strict";

function process() {
    let result = this.toObject();
    delete result._id;
    delete result.__v;
    return result;
}

/**
 * Schema Methods:
 * Schemas should act as facades that thunk out to smaller components that handle singular concerns.
 */
module.exports = {
    process
};
