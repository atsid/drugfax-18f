"use strict";

let {util} = require("../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let NavigationComponent = rewire("../components/navigationComponent");

describe("Navigation Component", function() {

    function loadNavComponentWithItems() {
        let items = [{
            name: "My Test Item",
            icon: "MyTestIcon",
            route: "myRoute"
        }];
        let Stubbed = util.stubRouterContext(NavigationComponent, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed items={items} />
        );
        expect(renderedComponent).to.exist;
        return renderedComponent;
    }

    function testItemsStartNotExpanded() {
        let renderedComponent = loadNavComponentWithItems();

        let items;
        expect(() =>
            items = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "nav__items")).to.not.throw();

        let hamburger;
        expect(() =>
            hamburger = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "nav__hamburger")).to.not.throw();

        // It should not start expanded
        expect(items.getDOMNode().className).to.not.contain("--expanded");

        return {
            hamburger: hamburger,
            items: items
        };
    }

    it("should load", function() {
        loadNavComponentWithItems();
    });

    it("should load items icons", function() {
        let renderedComponent = loadNavComponentWithItems();

        let icon;
        expect(() =>
            icon = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "nav__items__item__icon")).to.not.throw();

        expect(icon.getDOMNode().className).to.contain("MyTestIcon");
    });

    it("should load items label", function() {
        let renderedComponent = loadNavComponentWithItems();

        let label;
        expect(() =>
            label = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "nav__items__item__label")).to.not.throw();

        expect(label.getDOMNode().innerHTML).to.contain("My Test Item");
    });


    it("should set the expanded class to true if the hamburger is clicked", function() {
        let eles = testItemsStartNotExpanded();

        // click the hamburger
        React.addons.TestUtils.Simulate.click(eles.hamburger);

        // It should be expanded
        expect(eles.items.getDOMNode().className).to.contain("--expanded");
    });


    it("should set the expanded class to false if the hamburger is clicked twice", function() {
        let eles = testItemsStartNotExpanded();

        // click the hamburger
        React.addons.TestUtils.Simulate.click(eles.hamburger);
        React.addons.TestUtils.Simulate.click(eles.hamburger);

        // It should be expanded
        expect(eles.items.getDOMNode().className).to.not.contain("--expanded");
    });
});
