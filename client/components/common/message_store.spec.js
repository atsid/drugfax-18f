"use strict";

let { expect } = require("chai");

describe("message store", () => {

    let store = require("./message_store").messageStore;
    beforeEach(() => {
        store.clearMessages();
        store.clearListeners();
    });

    describe("addMessage", () => {
        it("should add a message", () => {
            store.addMessage("error", "TEST MESSAGE");
            expect(store.getMessages()[0]).to.be.deep.equal({ type: "error", text: "TEST MESSAGE" });
        });
    });

    describe("addMessageListener", () => {
        it("should fire when a message is added", () => {
            let called = false;
            store.addMessageListener(() => {
                called = true;
            });
            store.addMessage("error", "TEST MESSAGE");
            expect(called).to.be.true;
        });
        it("should pass the correct message when called", () => {
            store.addMessageListener((message) => {
                expect(message).to.be.deep.equal({ type: "error", text: "TEST MESSAGE" });
            });
            store.addMessage("error", "TEST MESSAGE");
        });
    });

    describe("getMessages", () => {
        it("should return all messages", () => {
            store.addMessage("error", "TEST MESSAGE");
            store.addMessage("success", "TEST MESSAGE2");
            expect(store.getMessages()).to.be.deep.equal([
                { type: "error", text: "TEST MESSAGE" },
                { type: "success", text: "TEST MESSAGE2" }
            ]);
        });
    });

    describe("removeMessage", () => {
        it("should return the removed message if the message is in the store", () => {
            store.addMessage("error", "TEST MESSAGE");

            let message = store.getMessages()[0];

            expect(store.removeMessage(message)).to.be.deep.equal(message);
        });

        it("should return undefined if the message is not in the store", () => {
            expect(store.removeMessage({ type: "success", text: "NOT IN STORE" })).to.be.undefined;
        });
    });

    describe("clearMessages", () => {
        it("should clear all messages after called", () => {
            store.addMessage("error", "TEST MESSAGE");

            store.clearMessages();

            expect(store.getMessages().length).to.be.equal(0);
        });
    });

    describe("removeMessageListener", () => {
        it("should return the removed listener if the listener is in the store", () => {
            let listener = () => {};
            store.addMessageListener(listener);
            expect(store.removeMessageListener(listener)).to.be.equal(listener);
        });

        it("should return undefined if the listener is not in the store", () => {
            expect(store.removeMessageListener(() => {})).to.be.undefined;
        });
    });

    describe("clearListeners", () => {
        it("should clear all listeners after called", () => {
            let called = false;
            store.addMessageListener(() => {
                called = true;
            });

            store.clearListeners();

            store.addMessage("error", "TEST MESSAGE");

            expect(called).to.be.false;
        });
    });
});
