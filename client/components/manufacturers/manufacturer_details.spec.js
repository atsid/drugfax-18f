"use strict";

let { util } = require("../../common.spec/spec.helpers");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let ManufacturerDetailsComponent = rewire("./manufacturer_details");
let sinon = require("sinon");
let { expect } = require("chai");

describe("Manufacturer Detail Component", function() {

    function createManufacturerDetailComponent(params) {
        let store = {
            list: function() {},
            get: function() {
            }
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

    function statTest(statProp, parentSelector, eleValue, statValue, done) {
        let { renderedComponent, store, promise } = createManufacturerDetailComponent({ detailId: "TESTMAN" });
        promise.trigger({
            name: "TESTMAN",
            stats: {
                [statProp]: statValue
            }
        });

        // For some reason this timeout is necessary, Bluebird?
        setTimeout(function() {
            let badgeEle = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, parentSelector);
            let numberEle = ReactTestUtils.findRenderedDOMComponentWithClass(badgeEle, "badge__number");
            expect(numberEle.getDOMNode().innerHTML).to.be.equal(eleValue);
            done();
        }, 10);
    }

    let letterTest = statTest.bind(this, "grade", "info__badge");

    it("should load", function() {
        expect(createManufacturerDetailComponent().renderedComponent).to.exist;
    });

    it("should try to load the state from the store on load", function() {
        let { renderedComponent, store } = createManufacturerDetailComponent({ detailId: "TESTMAN" });

        sinon.assert.calledOnce(store.get);
    });

    it("should load totalDrugs", function(done){
        statTest("totalDrugs", "info__drugs", "12", 12, done);
    });

    it("should load totalIncidents", function(done){
        statTest("totalIncidents", "info__events", "12", 12, done);
    });

    it("should display \"A\" for >= 90", function(done){
        letterTest("A", 90, done);
    });

    it("should display \"B\" for >= 80", function(done){
        letterTest("B", 80, done);
    });

    it("should display \"C\" for >= 70", function(done){
        letterTest("C", 70, done);
    });

    it("should display \"D\" for >= 60", function(done){
        letterTest("D", 60, done);
    });

    it("should display \"F\" for < 50", function(done){
        letterTest("F", 40, done);
    });

    it("should display \"B\"+ for > 87", function(done){
        letterTest("B+", 88, done);
    });
});
