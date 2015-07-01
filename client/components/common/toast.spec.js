"use strict";

let { util } = require("../../common.spec/spec.helpers");
let React = require("react/addons");
let rewire = require("rewire");
let ReactTestUtils = React.addons.TestUtils;
let Toast = rewire("./toast");
let { expect } = require("chai");

describe("Toast", () => {
    let createComponent = (props, successCallback, failureCallback) => {
        let ToastContainer = util.fakeComponent("toast-container", {
            success(...args) {
                if (successCallback) {
                    successCallback.apply(this, args);
                }
            },
            error(...args) {
                if (failureCallback) {
                    failureCallback.apply(this, args);
                }
            }
        });
        let ToastMessageFactory = util.fakeComponent("toast-message-factory");
        let store = {
            addMessageListener(listener) {
                store.__listener = listener;
            },
            removeMessage(message) {
                store.__removedMessage = message;
            }
        };

        Toast.__set__("ToastContainer", ToastContainer);
        Toast.__set__("ToastMessageFactory", ToastMessageFactory);
        return {
            renderedComponent: ReactTestUtils.renderIntoDocument(
                <Toast store={store} {...props}/>
            ),
            ToastMessageFactory,
            ToastContainer,
            store
        };
    };

    it("should load", () => {
        expect(createComponent().renderedComponent).to.exist;
    });

    it("should call success on the toast component if a success message is pushed", () => {
        let called = false;
        let { store, ToastContainer } = createComponent({}, (message) => {
            called = true;
            expect(message).to.be.equal("test message");
        });

        store.__listener({ type: "success", text: "test message" });

        expect(called).to.be.true;
    });

    it("should remove message after a success message was pushed", () => {
        let { store, ToastContainer } = createComponent();

        store.__listener({ type: "success", text: "test message" });

        expect(store.__removedMessage).to.be.deep.equal({ type: "success", text: "test message" });
    });

    it("should call error on the toast component if a error message is pushed", () => {
        let called = false;
        let { store, ToastContainer } = createComponent({}, undefined, (message) => {
            called = true;
            expect(message).to.be.equal("test message");
        });

        store.__listener({ type: "error", text: "test message" });

        expect(called).to.be.true;
    });

    it("should remove message after a error message was pushed", () => {
        let { store, ToastContainer } = createComponent();

        store.__listener({ type: "error", text: "test message" });

        expect(store.__removedMessage).to.be.deep.equal({ type: "error", text: "test message" });
    });
});
