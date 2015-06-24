"use strict";

require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let StyledButton = require("../../components/common/styledButton");

describe("StyledButton Component", function() {
    it("should load", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <StyledButton />
        );

        expect(renderedComponent).to.exist;
    });

    it("should load an icon if the icon property is set", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <StyledButton icon={"MyTestIcon"} />
        );

        var icon =
            ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "i");

        expect(icon.getDOMNode().className).to.contain("MyTestIcon");
    });

    it("should not load an icon if the icon property is not set", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <StyledButton />
        );

        expect(() => {
            ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "i");
        }).to.throw();
    });

    it("should call onClick if the button was clicked", function() {
        var clicked = false;
        function click() {
            clicked = true;
        }
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <StyledButton icon={"MyTestIcon"} onClick={click} />
        );

        var button =
            ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "button");

        React.addons.TestUtils.Simulate.click(button);

        expect(clicked).to.be.true;
    });
});
