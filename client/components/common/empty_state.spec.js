"use strict";

require("../../common.spec/spec.helpers");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let EmptyState = require("./empty_state");
let { expect } = require("chai");

describe("Empty state component", function() {
    it("should render itself and children to the dom", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <EmptyState>
                <p>test</p>
            </EmptyState>
        );
        expect(renderedComponent).to.exist;
        ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "p");
    });

    it("should render an optional icon", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <EmptyState iconClass="fa-frown-o">
                <p>test</p>
            </EmptyState>
        );
        expect(renderedComponent).to.exist;
        ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "p");
        ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "i");
        ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "fa-frown-o");
    });
});
