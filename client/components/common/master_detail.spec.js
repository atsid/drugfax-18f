"use strict";

let { util } = require("../../common.spec/spec.helpers");
let React = require("react/addons");
let rewire = require("rewire");
let ReactTestUtils = React.addons.TestUtils;
let MasterDetail = rewire("./master_detail");
let { expect } = require("chai");
let sinon = require("sinon");

describe("MasterDetail", () => {
    let createComponent = (props) => {
        let SearchField = util.fakeComponent();
        let ListDisplay = util.fakeComponent();
        MasterDetail.__set__("SearchField", SearchField);
        MasterDetail.__set__("ListDisplay", ListDisplay);
        return {
            SearchField: SearchField,
            renderedComponent: ReactTestUtils.renderIntoDocument(
                <MasterDetail params={{}} {...props}/>
            ),
            ListDisplay: ListDisplay
        };
    };

    let createStore = () => {
        let me = {
            listByName: () => {}
        };
        return sinon.stub(me);
    };

    /**
     * Starts a serach test
     * @param loadData whether or not to return data from the services
     */
    let searchTest = (loadData, fakeData, additionalArgs) => {
        let fakeStore = createStore();
        let fakePromise = util.fakePromise();
        let { renderedComponent, SearchField, ListDisplay } = createComponent(Object.assign({ store: fakeStore }, additionalArgs || {}));

        fakeData = fakeData || ["1", "2", "3"];

        // When the store is called at all, then return our fake promise
        fakeStore.listByName.withArgs(sinon.match.any).onFirstCall().returns(fakePromise);

        // Fake perform search
        SearchField.onSearch("Test search");

        if (loadData) {
            // Let the app know the promise is done
            fakePromise.trigger({
                total: 800,
                data: fakeData
            });
        }

        return {
            fakeData,
            renderedComponent,
            fakePromise,
            SearchField,
            fakeStore,
            ListDisplay
        };
    };

    it("should load", () => {
        expect(createComponent().renderedComponent).to.exist;
    });

    it("should render help text on load", () => {
        let component = createComponent({ masterSearchPlaceholder: "MY SEARCH TEXT" }).renderedComponent;
        expect(component.getDOMNode().innerHTML).to.contain("MY SEARCH TEXT");
    });

    it("should not render help text after a search", () => {
        let { renderedComponent } = searchTest(true, [], { masterSearchPlaceholder: "MY SEARCH TEXT" });

        let component = createComponent({ masterSearchPlaceholder: "MY SEARCH TEXT" }).renderedComponent;
        expect(component.getDOMNode().innerHTML).to.contain("MY SEARCH TEXT");
    });

    it("should load the 'no items' view if a search was performed with no results", () => {
        let { renderedComponent } = searchTest(true, []);

        // Make sure it loaded the empty
        expect(renderedComponent.getDOMNode().innerHTML.replace(/<[^>]*>/g, "")).to.contain("No results for \"Test search\"");
    });

    it("should load the total count if there are items", () => {
        let { renderedComponent, fakeData } = searchTest(true);
        let resultEle =
            ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "result-count");

        // Make sure it loaded the result count
        expect(resultEle.getDOMNode().innerHTML.replace(/<[^>]*>/g, "")).to.contain("800 results found");
    });

    it("should pass along the list item renderer to the list display", () => {
        let fakeListItem = () => {};
        let { renderedComponent, fakeData, ListDisplay } = searchTest(true, undefined, { listItem: fakeListItem });

        expect(ListDisplay.itemComponent).to.equal(fakeListItem);
    });

    it("should pass along the data to the list display", () => {
        let fakeListItem = () => {};
        let { renderedComponent, fakeData, ListDisplay } = searchTest(true, undefined, { listItem: fakeListItem });

        expect(ListDisplay.data).to.equal(fakeData);
    });

    it("should set the 'loading' property on the search while the data is loading", () => {
        let { renderedComponent, SearchField } = searchTest(false);

        expect(SearchField.loading).to.be.true;
    });

    it("should set the 'loading' property to false on the search while the data is loading", () => {
        let { renderedComponent, SearchField } = searchTest(true);

        expect(SearchField.loading).to.be.false;
    });

    it("should load the next set of data when infinite loading is called", () => {
        let { renderedComponent, fakeStore, fakeData, ListDisplay } = searchTest(true);
        let newFakePromise = util.fakePromise();

        // Prep the store for the call
        fakeStore.listByName.withArgs(sinon.match.any).returns(newFakePromise);

        // Tell master detail to load
        ListDisplay.onInfiniteLoad();

        // Make sure it's passing the right params
        expect(fakeStore.listByName.args[1]).to.be.deep.equal(["Test search", 40, 40]);

        // Trigger the response
        newFakePromise.trigger({ data: [4, 5, 6, 7], total: 1000 });

        // Make sure it loaded the new response
        let resultEle =
            ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "result-count");

        // Make sure it loaded the result count
        expect(resultEle.getDOMNode().innerHTML.replace(/<[^>]*>/g, "")).to.contain("1000 results found");
    });

    it("should reset its state if the path changes", () => {
        let { renderedComponent } = searchTest(true, undefined, { masterSearchPlaceholder: "MY SEARCH TEXT" });

        // Pretend the path was changed
        renderedComponent.setProps({ route: { path: "NEW PATH" }});

        // make sure it loaded the initial page
        expect(renderedComponent.getDOMNode().innerHTML).to.contain("MY SEARCH TEXT");
    });
});
