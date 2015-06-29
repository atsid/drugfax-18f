"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let ManufacturerListComponent = rewire("../../components/manufacturers/manufacturerList");
let { expect } = require("chai");

describe("Manufacturer List Component", function() {

    function createManufacturerList(data) {
        let listItemComponent = util.fakeComponent();
        ManufacturerListComponent.__set__("ManufacturerListItem", listItemComponent);
        let Stubbed = util.stubRouterContext(ManufacturerListComponent, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed data={data}/>
        );
        return {
            renderedComponent,
            listItemComponent
        };
    }

    it("should load", function() {
        expect(createManufacturerList([]).renderedComponent).to.exist;
    });

    it("should load an item for each item in the list", function() {
        let { listItemComponent, renderedComponent } = createManufacturerList([{ "set_id": 1 }, { "set_id": 2 }]);
        let items = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, "fake-component");

        // Make sure two components were loaded with the correct data
        expect(items.length).to.be.equal(2);
        expect(items[0].props.data).to.be.deep.equal({ "set_id": 1 });
        expect(items[1].props.data).to.be.deep.equal({ "set_id": 2 });
    });
});
