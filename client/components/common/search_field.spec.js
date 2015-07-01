"use strict";
require("../../common.spec/spec.helpers");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let SearchField = require("./search_field");
let { expect, assert } = require("chai");

let noopSearch = () => {};

describe("SearchField Component", () => {
    it("should load", function() {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <SearchField onSearch={noopSearch}/>
        );
        expect(renderedComponent).to.exist;
    });

    it("will bubble a search event when a search is performed", (done) => {
        let onSearch = (text) => {
            expect(text).to.equal("derp");
            done();
        };
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <SearchField onSearch={onSearch}/>
        );

        let searchIcon = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "i");
        let inputBox = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "input");
        ReactTestUtils.Simulate.click(searchIcon);
        ReactTestUtils.Simulate.change(inputBox, {target: {value: "derp"}});
        ReactTestUtils.Simulate.keyDown(inputBox, {key: "Enter", keyCode: 13});
    });

    it("will not trigger a search when a random key is pressed", () => {
        let onSearch = () => assert.fail("Search should not have been invoked");
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <SearchField onSearch={onSearch}/>
        );
        let searchIcon = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "i");
        let inputBox = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "input");
        ReactTestUtils.Simulate.click(searchIcon);
        ReactTestUtils.Simulate.keyDown(inputBox, {key: "Down", keyCode: 40});
    });

    it("will apply a loading state when the search results are loading", () => {
        var renderedComponent = ReactTestUtils.renderIntoDocument(
            <SearchField onSearch={noopSearch} loading={true}/>
        );
        let wrapperDiv = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "search-field");
        expect(wrapperDiv.props.className).to.contain("search-field--loading");
    });
});
