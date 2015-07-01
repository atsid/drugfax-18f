"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let ManufacturerListItem = rewire("./manufacturer_list_item");
let { expect } = require("chai");

describe("Manufacturer List Item Component", () => {

    let createComponent = (data) => {
        let Stubbed = util.stubRouterContext(ManufacturerListItem, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed data={data}/>
        );
        return {
            renderedComponent
        };
    }

    it("should load", () => {
        expect(createComponent({}).renderedComponent).to.exist;
    });

    it("should load the manufacturer name", () => {
        let { renderedComponent } = createComponent({ name: "TEST_NAME" });
        let div = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "manufacturer-list__item__name");

        expect(div.getDOMNode().innerHTML).to.be.equal("TEST_NAME");
    });

    it("should load the correct url for the link", () => {
        let { renderedComponent } = createComponent({ name: "TEST_NAME" });
        let link = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "a");

        expect(link.props.to).to.be.equal("/manufacturers/TEST_NAME");
    });
});
