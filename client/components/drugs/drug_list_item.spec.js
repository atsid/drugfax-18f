"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let DrugListItem = rewire("./drug_list_item");
let { expect } = require("chai");

describe("Drug List Item Component", function() {

    let testData = {
        "set_id": "TEST_ID",
        "openfda": {
            "brand_name": ["TEST_BRAND_NAME"],
            "manufacturer_name": ["TEST_MANUFACTURER_NAME"]
        }
    };

    function createComponent(data) {
        data = data || testData;
        let Stubbed = util.stubRouterContext(DrugListItem, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed data={data}/>
        );
        return {
            renderedComponent
        };
    }

    it("should load", function() {
        expect(createComponent().renderedComponent).to.exist;
    });

    it("should load the drug name", function() {
        let { renderedComponent } = createComponent();
        let div = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "drug-list__item__brand_name");

        expect(div.getDOMNode().innerHTML).to.be.equal("TEST_BRAND_NAME");
    });

    it("should load the manufacturer name", function() {
        let { renderedComponent } = createComponent();
        let div = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "drug-list__item__manufacturer_name");

        expect(div.getDOMNode().innerHTML).to.be.equal("TEST_MANUFACTURER_NAME");
    });

    it("should load the correct url for the link", function() {
        let { renderedComponent } = createComponent();
        let link = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "a");

        expect(link.props.to).to.be.equal("/drugs/TEST_ID");
    });
});
