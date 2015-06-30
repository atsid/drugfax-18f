"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let ManufacturersComponent = rewire("../../components/manufacturers");
let sinon = require("sinon");
let { expect } = require("chai");

describe("ManufacturersComponent", function() {

    function createManufacturerComponent(location) {
        let search = util.fakeComponent();
        let store = {
            list: function() {}
        };

        location = location || {};

        /*eslint-disable react/no-multi-comp*/
        let manufacturerListComponent = React.createClass({
            propTypes: {
                data: React.PropTypes.array
            },
            render() {
                manufacturerListComponent.data = this.props && this.props.data;
                return (<div></div>);
            }
        });
        ManufacturersComponent.__set__("SearchField", search);
        ManufacturersComponent.__set__("store", store);
        ManufacturersComponent.__set__("ManufacturerList", manufacturerListComponent);
        let Stubbed = util.stubRouterContext(ManufacturersComponent, "function");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed location={location}/>
        );
        return {
            renderedComponent,
            search,
            store: sinon.stub(store),
            manufacturerListComponent
        };
    }

    it("should load", function() {
        let Stubbed = util.stubRouterContext(ManufacturersComponent, "function");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed location={{}}/>
        );
        expect(renderedComponent).to.exist;
    });

    it("should set the populated class if the user has selected a result", function() {
        let { search, store, renderedComponent } = createManufacturerComponent({ query: { name: "Fake Manufacturer name"}});

        store.list.withArgs({ search: "name:test", limit: 10 }).returns(util.fakePromise());

        // Make sure it sets the loading class
        expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "manufacturers--populated")).to.not.throw();
    });

    it("should set the loading class if the services haven't returned", function() {
        let { search, store, renderedComponent } = createManufacturerComponent();

        store.list.withArgs({ search: "name:test", limit: 10 }).returns(util.fakePromise());

        // Perform the search
        search.onSearch("test");

        // Make sure it sets the loading class
        expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "manufacturers--loading")).to.not.throw();
    });

    it("should remove the loading class if the services have returned", function() {
        let { search, store, renderedComponent } = createManufacturerComponent();
        let promise = util.fakePromise();

        store.list.withArgs({ search: "name:test", limit: 10 }).returns(promise);

        // Perform the search
        search.onSearch("test");

        // Fake the list return
        promise.trigger({ body: { data: [1, 2, 3, 4] } });

        // Make sure the loading class is gone
        expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "manufacturers--loading")).to.throw();
    });

    it("should attempt to query the services when a search is performed by the user", function() {
        let { search, store } = createManufacturerComponent();

        store.list.withArgs({ search: "name:test", limit: 10 }).returns(util.fakePromise());

        // Perform the search
        search.onSearch("test");

        // Make sure the store was called at all
        sinon.assert.calledOnce(store.list);
    });

    it("should attempt to load the manufacturer list if the services come back with some data", function() {
        let { manufacturerListComponent, search, store } = createManufacturerComponent();
        let data = [1, 2, 3];
        let promise = util.fakePromise();
        store.list.withArgs(sinon.match.any).returns(promise);

        // Perform the search
        search.onSearch("test");

        // Fake the list return
        promise.trigger({ body: { data: data } });

        expect(manufacturerListComponent.data).to.be.deep.equal(data);

    });

    it("should set the data on the list to nothing if the query is empty", function() {
        let { manufacturerListComponent, search, store } = createManufacturerComponent();
        let data = [1, 2, 3];
        let promise = util.fakePromise();
        store.list.withArgs(sinon.match.any).returns(promise);

        // Perform the search
        search.onSearch("");

        // Fake the list return
        promise.trigger({ body: { data: data } });

        expect(manufacturerListComponent.data).to.be.undefined;

    });

    it("should set the data on the list to nothing if the query fails", function() {
        let { manufacturerListComponent, search, store } = createManufacturerComponent();

        let promise = util.fakePromise();

        store.list.withArgs(sinon.match.any).returns(promise);

        // Perform the search
        search.onSearch("test");

        // Fake the list return
        promise.triggerFailure();

        expect(manufacturerListComponent.data).to.be.undefined;

    });

});
