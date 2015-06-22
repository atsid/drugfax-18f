"use strict";

require("./spec.helpers");

let React = require("react");
require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let ParentComponent = require("../components/parentComponent");

describe("Parent Component", function() {
    it("should load", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <ParentComponent />
        );

        expect(renderedComponent).to.exist;
    });

    it("setting the name on the parent component should cause its heading to change", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
          <ParentComponent />
        );

        renderedComponent.setState({ name: "My Test Name" });

        var heading =
            ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "h3");

        expect(heading.getDOMNode().innerHTML).to.equal("My Test Name");
    });
});
