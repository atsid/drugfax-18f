"use strict";

require("../common.spec/spec.helpers");

let React = require("react");
require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let LoginComponent = rewire("../components/loginComponent");

describe("Login Component", function() {

    it("should load", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <LoginComponent />
        );
        expect(renderedComponent).to.exist;
    });

    /**
     * Creates a button click test
     */
    function buttonClickTest(name) {
        it("should try to login when the " + name + " button is clicked", function() {
            var loginCalled = false;
            LoginComponent.__set__("authentication", {
                login: function(type) {
                    loginCalled = true;
                    expect(type).to.equal(name);
                    return {
                        then: function() {}
                    };
                }
            });

            var renderedComponent = ReactTestUtils.renderIntoDocument(
              <LoginComponent />
            );

            var button =
                ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "button--" + name);

            React.addons.TestUtils.Simulate.click(button);

            expect(loginCalled).to.be.true;
        });
    }

    buttonClickTest("facebook");
    buttonClickTest("twitter");
    buttonClickTest("demo");
});
