"use strict";
require("../common.spec/spec.helpers");
let { expect } = require("chai");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let Drugfax = require("./drugfax");

describe("Routes Component", () => {
    it("should load", () => {
        let renderedComponent = ReactTestUtils.renderIntoDocument(
            <Drugfax />
        );
        expect(renderedComponent).to.exist;
    });
});
