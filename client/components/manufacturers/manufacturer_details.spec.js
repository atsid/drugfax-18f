"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let ManufacturerDetailsComponent = rewire("./manufacturer_details");
let sinon = require("sinon");
let { expect } = require("chai");

describe("Manufacturer Detail Component", () => {

    let createManufacturerDetailComponent = (params) => {
        let store = {
            list: function() {},
            get: function() {}
        };
        let storeStub = sinon.stub(store);
        let promise = util.fakePromise();

        storeStub.get.withArgs(sinon.match.any).returns(promise);

        params = params || {};

        ManufacturerDetailsComponent.__set__("manufacturerStore", store);
        let Stubbed = util.stubRouterContext(ManufacturerDetailsComponent, "function");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed params={params} noTransition={true}/>
        );
        return {
            renderedComponent,
            store: storeStub,
            promise
        };
    }

    let statTest = (statProp, parentSelector, eleValue, statValue, done) => {
        let { renderedComponent, store, promise } = createManufacturerDetailComponent({ detailId: "TESTMAN" });
        promise.trigger({
            name: "TESTMAN",
            stats: {
                [statProp]: statValue
            }
        });

        // For some reason this timeout is necessary, Bluebird?
        setImmediate(() => {
            let badgeEle = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, parentSelector);
            let numberEle = ReactTestUtils.findRenderedDOMComponentWithClass(badgeEle, "badge__number");
            expect(numberEle.getDOMNode().innerHTML).to.be.equal(eleValue);
            done();
        });
    }

    let letterTest = statTest.bind(this, "grade", "info__badge");

    it("should load", () => {
        expect(createManufacturerDetailComponent().renderedComponent).to.exist;
    });

    it("should try to load the state from the store on load", () => {
        let { renderedComponent, store } = createManufacturerDetailComponent({ detailId: "TESTMAN" });

        sinon.assert.calledOnce(store.get);
    });

    it("should load totalDrugs", (done) => {
        statTest("totalDrugs", "info__drugs", "12", 12, done);
    });

    it("should load totalIncidents", (done) => {
        statTest("totalIncidents", "info__events", "12", 12, done);
    });

    it("should display \"A\" for >= 90", (done) => {
        letterTest("A", 90, done);
    });

    it("should display \"B\" for >= 80", (done) => {
        letterTest("B", 80, done);
    });

    it("should display \"C\" for >= 70", (done) => {
        letterTest("C", 70, done);
    });

    it("should display \"D\" for >= 60", (done) => {
        letterTest("D", 60, done);
    });

    it("should display \"F\" for < 50", (done) => {
        letterTest("F", 40, done);
    });

    it("should display \"B\"+ for > 87", (done) => {
        letterTest("B+", 88, done);
    });
});
