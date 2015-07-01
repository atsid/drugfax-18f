"use strict";

let { messageTypes, messageStore } = require("../components/common/message_store");

class BaseStore {

    /**
     * Generic error handler
     * @param err The error that occurred
     */
    errorHandler(genericMessage, err) {
        if (err && err.name !== "CancellationError") {
            messageStore.addMessage(messageTypes.error, genericMessage + (err.message || "Unknown Error"));
        }
    }
}

module.exports = BaseStore;
