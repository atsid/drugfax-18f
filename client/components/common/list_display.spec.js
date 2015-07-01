"use strict";

let { util } = require("../../common.spec/spec.helpers");
let React = require("react/addons");
let rewire = require("rewire");
let ReactTestUtils = React.addons.TestUtils;
let ListDisplay = rewire("./list_display");
let { expect } = require("chai");

describe("ListDisplay", () => {
    let createComponent = (data, props) => {
        let Infinite = util.fakeComponent();
        let itemComponent = util.fakeComponent("item-component");
        let itemName = "Fake Item Name";
        let Stubbed = util.stubRouterContext(ListDisplay, "object");
        props = props || {};
        props.router = {};
        data = data || [];

        ListDisplay.__set__("Infinite", Infinite);
        return {
            Infinite,
            renderedComponent: ReactTestUtils.renderIntoDocument(
                <Stubbed itemComponent={itemComponent} itemHeight={50} data={data} itemName={itemName} {...props}/>
            ),
            itemComponent,
            itemName
        };
    };

    it("should load", () => {
        expect(createComponent().renderedComponent).to.exist;
    });

    it("should load items for each data element", () => {
        let fakeData = [1, 2, 3];
        let { renderedComponent, itemComponent } = createComponent(fakeData);
        let items = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, "item-component-fake-component");

        expect(items.length).to.be.equal(3);
        expect(items.map((item) => item.props.data)).to.be.deep.equal([1, 2, 3]);
    });

    it("should pipe onInfiniteLoad to props", () => {
        let fakeData = [1, 2, 3];
        let called = false;
        let { renderedComponent, Infinite, itemComponent } = createComponent(fakeData, {
            onInfiniteLoad: () => called = true
        });

        // Pretend infinite fired
        Infinite.onInfiniteLoad();

        expect(called).to.be.true;
    });
});
