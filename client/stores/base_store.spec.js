"use strict";

let { util } = require("../common.spec/spec.helpers");
let rewire = require("rewire");
let BaseStore = rewire("./base_store");
let { expect } = require("chai");

describe("base store", () => {
    let createStore = () => {
        let messageStore = {
            addMessage(type, text) {
                messageStore.__addedMessageType = type;
                messageStore.__addedMessageText = text;
            }
        };

        BaseStore.__set__("messageStore", messageStore);
        return {
            store: new BaseStore(),
            messageStore
        };
    };
    describe("errorHandler", () => {
        it("should load", () => {
            expect(createStore().store).to.exist;
        });

        it("should add a message to the message store", () => {
            let { messageStore, store } = createStore();
            store.errorHandler("Test Error: ", { name: "Test error", message: "Test Message" });

            expect(messageStore.__addedMessageType).to.be.equal("error");
            expect(messageStore.__addedMessageText).to.be.equal("Test Error: Test Message");
        });

        it("should not add a message to the message store if it is a cancellation error", () => {
            let { messageStore, store } = createStore();
            store.errorHandler("Test Error: ", { name: "CancellationError", message: "Test Message" });

            expect(messageStore.__addedMessageType).to.be.undefined;
            expect(messageStore.__addedMessageText).to.be.undefined;
        });
    });
});
