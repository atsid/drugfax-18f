"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let ManufacturerListItemComponent = rewire("../../components/manufacturers/manufacturerListItem");
let { expect } = require("chai");

describe("Manufacturer List Item Component", function() {

    function createManufacturerList(data) {
        let Stubbed = util.stubRouterContext(ManufacturerListItemComponent, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed data={data}/>
        );
        return {
            renderedComponent
        };
    }

    it("should load", function() {
        expect(createManufacturerList({}).renderedComponent).to.exist;
    });

    it("should load links for each item", function() {
        let { renderedComponent } = createManufacturerList({ name: 1 });
        let item = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "manufacturer-list__item");

        // Make sure two components were loaded with the correct data
        expect(item.props.query).to.be.deep.equal({ name: 1 });
    });
});
