"use strict";

require("../../common.spec/spec.helpers");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let Loader = require("./loader");
let { expect } = require("chai");

describe("Loader Component", function() {
    it("loads an svg drawing into the DOM", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <Loader />
        );
        expect(renderedComponent).to.exist;
        ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "svg");
        ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "circle");
    });
});
