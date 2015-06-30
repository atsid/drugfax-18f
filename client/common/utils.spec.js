"use strict";
let specUtil = require("../common.spec/spec.helpers").util;
let util = require("../common/utils");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let { expect } = require("chai");

describe("utils", function() {
    describe("createGuardComponent", function() {
        function createGuardComponent() {
            let promise = specUtil.fakePromise();
            let fakeComponent = React.createClass({
                render() {
                    return (<div className={"fakeComponent"}>Fake Component</div>);
                }
            });
            let component = util.createGuardComponent(() => promise, fakeComponent, { state: "MyFakeState" });
            return {
                component,
                fakeComponent,
                promise
            };
        }

        it("should transition to the passed in state if the test function doesn't pass", function() {
            let { promise, component } = createGuardComponent();
            let called = false;
            let Stubbed = specUtil.stubRouterContext(component, "object", {
                transitionTo: function(state) {
                    called = true;
                    expect(state).to.equal("MyFakeState");
                }
            });

            // Render our fake component
            var rendered = ReactTestUtils.renderIntoDocument(
              <Stubbed><div></div></Stubbed>
            );

            // Let the guarded component know that the user doesn't have access
            promise.trigger(false);

            // Make sure the element doesn't get added
            expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "fakeComponent")).to.throw;

            expect(called).to.be.true;
        });

        it("should load the fake component if the test function does pass", function() {
            let { promise, component } = createGuardComponent();
            let Stubbed = specUtil.stubRouterContext(component, "object");

            // Render our fake component
            var rendered = ReactTestUtils.renderIntoDocument(
              <Stubbed><div></div></Stubbed>
            );

            // Let the guarded component know that the user doesn't have access
            promise.trigger(true);

            // Make sure the element does get added
            expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "fakeComponent")).to.not.throw;
        });
    });
});
