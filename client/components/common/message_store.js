"use strict";

let messageListeners = [];
let messages = [];

let messageTypes = {
    success: "success",
    error: "error"
};

/**
 * A generic message store that stores a message
 */
let messageStore = {

    /**
     * Adds a message to the message store
     * @param The type of message
     */
    addMessage(type, text) {
        if (!messageTypes[type]) {
            throw new Error("Could not add message of type " + type);
        }
        let message = { type: type, text: text };
        messages.push(message);
        messageStore._notifyListeners(message);
    },

    /**
     * Adds a listener for when messages are added
     * @param listener The message listener
     */
    addMessageListener(listener) {
        messageListeners.push(listener);
    },

    /**
     * Removes a listener for when messages are removed
     * @param listener The message listener
     */
    removeMessageListener(listener) {
        let index = messageListeners.indexOf(listener);
        if (index >= 0) {
            return messageListeners.splice(index, 1)[0];
        }
    },

    /**
     * Gets all messages in the store
     */
    getMessages() {
        return messages.slice(0);
    },

    /**
     * Removes the given message from the store
     * @param message The message to remove
     */
    removeMessage(message) {
        let index = messages.indexOf(message);
        if (index >= 0) {
            return messages.splice(index, 1)[0];
        }
    },

    /**
     * Clears all messages in the store
     */
    clearMessages() {
        messages.length = 0;
    },

    /**
     * Clears all listeners in the store
     */
    clearListeners() {
        messageListeners.length = 0;
    },

    /**
     * Notifies our listeners of the given message being received
     * @param message The message that was recieved
     */
    _notifyListeners(message) {
        messageListeners.forEach((listener) => {
            listener(message);
        });
    }
};

module.exports = {
    messageStore,
    messageTypes
};
