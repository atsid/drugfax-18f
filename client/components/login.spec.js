"use strict";

let { util } = require("../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let Login = rewire("../components/login");
let { expect } = require("chai");

describe("Login Component", function() {
    it("should load", function() {
        let Stubbed = util.stubRouterContext(Login, "function");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed />
        );
        expect(renderedComponent).to.exist;
    });

    function simulateLogin(name, routerStubs, props) {
        let Stubbed = util.stubRouterContext(Login, "function", routerStubs);
        let loginCalled = false;
        let promise = util.fakePromise();
        Login.__set__("authentication", {
            login: function(type) {
                loginCalled = true;
                expect(type).to.equal(name);
                return promise;
            }
        });

        let component = ReactTestUtils.renderIntoDocument(
          <Stubbed {...props} />
        );

        let button =
            ReactTestUtils.findRenderedDOMComponentWithClass(component, "button--" + name);

        React.addons.TestUtils.Simulate.click(button);

        expect(loginCalled).to.be.true;
        return {
            component,
            promise
        };
    }

    /**
     * Creates a button click test
     */
    function buttonClickTest(name) {
        it("should try to login when the " + name + " button is clicked", function() {
            simulateLogin(name);
        });
    }

    buttonClickTest("facebook");
    buttonClickTest("twitter");
    buttonClickTest("demo");

    it("should set the location to the nextPathLocation if login returns true, and the state is specified", function() {
        let called = false;
        let { promise } = simulateLogin("demo", {
            replaceWith: function (state) {
                called = true;
                expect(state).to.equal("MyTestState");
            }
        }, {
            location: {
                state: {
                    nextPathname: "MyTestState"
                }
            }
        });
        promise.trigger(true);

        expect(called).to.be.true;
    });

    it("should set the location to '/' if login returns true, and the state is not specified", function() {
        let called = false;
        let { promise, component } = simulateLogin("demo", {
            replaceWith: function (state) {
                called = true;
                expect(state).to.equal("/");
            }
        });
        promise.trigger(true);

        expect(called).to.be.true;
        expect(component.getDOMNode().className).to.not.contain("--error");
    });

    it("should set the error state if login returns false", function() {
        let { promise, component } = simulateLogin("demo");

        promise.trigger(false);

        expect(component.getDOMNode().className).to.contain("--error");
    });

    it("should set the error state if login fails", function() {
        let { promise, component } = simulateLogin("demo");

        promise.triggerFailure(true);

        expect(component.getDOMNode().className).to.contain("--error");
    });

});
