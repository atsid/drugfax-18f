"use strict";

let { util } = require("../../common.spec/spec.helpers");
let { animationPromise } = require("../../common/utils");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let DrugStats = rewire("./drug_stats");
let { expect } = require("chai");
let sinon = require("sinon");

describe("Drug Stats Component", () => {

    let createStore = () => {
        let store = {
            getDrugStats: () => {},
            getEventCounts: () => {},
            getEnforcementCounts: () => {}
        };
        return sinon.stub(store);
    };
    let createComponent = (props) => {
        let drugStoreStub = createStore();
        let statPromise = util.fakePromise();
        let eventPromise = util.fakePromise();
        let enforcementPromise = util.fakePromise();

        drugStoreStub.getDrugStats.withArgs(sinon.match.any).returns(statPromise);
        drugStoreStub.getEventCounts.withArgs(sinon.match.any).returns(eventPromise);
        drugStoreStub.getEnforcementCounts.withArgs(sinon.match.any).returns(enforcementPromise);

        props = props || {};

        DrugStats.__set__("drugStore", drugStoreStub);
        let Stubbed = util.stubRouterContext(DrugStats, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed {...props} noTransition={true}/>
        );
        return {
            renderedComponent,
            store: drugStoreStub,
            statPromise,
            eventPromise,
            enforcementPromise
        };
    };

    /**
     * Simple test for checking if the component html contains the given text
     */
    let checkForTextTest = (text, deaths, done) => {
        let { statPromise, eventPromise, enforcementPromise, renderedComponent } = createComponent({ dataId: "1" });

        statPromise.trigger({totalDeaths: deaths});
        eventPromise.trigger({});
        enforcementPromise.trigger({});

        setImmediate(() => {
            expect(renderedComponent.getDOMNode().innerHTML).to.contain(text);
            done();
        });
    };

    it("should load", () => {
        expect(createComponent({dataId: "1"}).renderedComponent).to.exist;
    });

    it("should render the stats", (done) => {
        checkForTextTest("Deaths", 0, done);
    });

    it("should render an F for > 1000 deaths", (done) => {
        checkForTextTest("badge--f", 1001, done);
    });
    it("should render an D for > 500 deaths", (done) => {
        checkForTextTest("badge--d", 550, done);
    });
    it("should render a C for > 250 deaths", (done) => {
        checkForTextTest("badge--c", 260, done);
    });
    it("should render a B for > 100 deaths", (done) => {
        checkForTextTest("badge--b", 105, done);
    });
    it("should render an A for < 100 deaths", (done) => {
        checkForTextTest("badge--a", 50, done);
    });

});
