"use strict";

let { util } = require("../../common.spec/spec.helpers");
let { animationPromise } = require("../../common/utils");

let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let rewire = require("rewire");
let DrugDetails = rewire("./drug_details");
let { expect } = require("chai");
let sinon = require("sinon");

describe("Drug Details Component", () => {

    let testDrugData = {
        "set_id": "TEST_ID",
        "openfda": {
            "brand_name": ["TEST_BRAND_NAME"],
            "generic_name": ["TEST_GENERIC_NAME"],
            "manufacturer_name": ["TEST_MANUFACTURER_NAME"],
            "product_type": ["TEST_PRODUCT_TYPE"],
            "route": ["TEST_ROUTE"]
        },
        "warnings": "TEST_WARNINGS",
        "dosage_and_administration": "TEST_DOSAGE",
        "indications_and_usage": "TEST_INDICATIONS_AND_USAGE"
    };

    let createStore = () => {
        let store = {
            list: () => {},
            get: () => {},
            getSubscription: () => {},
            unsubscribe: () => {},
            subscribe: () => {}
        };
        return sinon.stub(store);
    };
    let createComponent = (params) => {
        let drugStoreStub = createStore();
        let subStoreStub = createStore();
        let drugPromise = util.fakePromise();
        let ap = animationPromise.bind(null, 0);
        let subPromise = util.fakePromise();
        let DrugStats = util.fakeComponent();
        let StyledButton = util.fakeComponent("styled-button");

        drugStoreStub.get.withArgs(sinon.match.any).returns(drugPromise);
        subStoreStub.getSubscription.withArgs(sinon.match.any).returns(subPromise);

        params = params || {};

        DrugDetails.__set__("drugStore", drugStoreStub);
        DrugDetails.__set__("subscriptionStore", subStoreStub);
        DrugDetails.__set__("animationPromise", ap);
        DrugDetails.__set__("DrugStats", DrugStats);
        DrugDetails.__set__("StyledButton", StyledButton);
        let Stubbed = util.stubRouterContext(DrugDetails, "object");
        let renderedComponent = ReactTestUtils.renderIntoDocument(
          <Stubbed params={params} noTransition={true}/>
        );
        return {
            renderedComponent,
            store: drugStoreStub,
            subStore: subStoreStub,
            drugPromise,
            ap,
            subPromise,
            StyledButton
        };
    };

    /**
     * Simple test for checking if the component html contains the given text
     */
    let checkForTextTest = (text, done) => {
        let { drugPromise, subPromise, renderedComponent } = createComponent({ detailId: 1 });

        drugPromise.trigger(testDrugData);
        subPromise.trigger({});

        setImmediate(() => {
            expect(renderedComponent.getDOMNode().innerHTML).to.contain(text);
            done();
        });
    };

    /**
     * Creates a test for checking that the button text for subscriptions is correct
     */
    let subscribeButtonTextTest = (subscription, buttonText, done) => {
        let { drugPromise, subPromise, renderedComponent } = createComponent({ detailId: 1 });
        drugPromise.trigger(testDrugData);
        subPromise.trigger(subscription);

        setImmediate(() => {
            let button = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "styled-button-fake-component");
            expect(button.getDOMNode().innerHTML).to.contain(buttonText || "Save to My Drugs");
            done();
        });
    };

    /**
     * Creates a test for checking that subscriptions are being added/removed when the user clicks a button
     */
    let subscribeButtonServiceTest = (subscription, serviceMethod, expectedResult, done) => {
        let { drugPromise, subPromise, subStore, renderedComponent } = createComponent({ detailId: 1 });
        drugPromise.trigger(testDrugData);
        subPromise.trigger(subscription);

        setImmediate(() => {
            subStore[serviceMethod].withArgs(sinon.match.any).returns(util.fakePromise());

            let button = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, "styled-button-fake-component");
            button.props.onClick();

            expect(subStore[serviceMethod].args[0]).to.be.deep.equal(expectedResult);
            done();
        });
    };

    it("should load", () => {
        expect(createComponent().renderedComponent).to.exist;
    });

    it("should load generic name", (done) => {
        checkForTextTest("TEST_GENERIC_NAME", done);
    });

    it("should load product type", (done) => {
        checkForTextTest("TEST_PRODUCT_TYPE", done);
    });

    it("should load dosage_and_administration", (done) => {
        checkForTextTest("TEST_DOSAGE", done);
    });

    it("should load warnings", (done) => {
        checkForTextTest("TEST_WARNINGS", done);
    });

    it("should load route", (done) => {
        checkForTextTest("TEST_ROUTE", done);
    });

    it("should load brand name", (done) => {
        checkForTextTest("TEST_BRAND_NAME", done);
    });

    it("should load indication and usage", (done) => {
        checkForTextTest("TEST_INDICATIONS_AND_USAGE", done);
    });

    it("should link to the manufacturer", (done) => {
        let { drugPromise, subPromise, renderedComponent } = createComponent({ detailId: 1 });
        drugPromise.trigger(testDrugData);
        subPromise.trigger({});

        setImmediate(() => {
            let linkEle = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, "a");
            expect(linkEle.props.to).to.be.equal("/manufacturers/TEST_MANUFACTURER_NAME");
            done();
        });
    });

    it("should show the subscribe text if there is no subscription", (done) => {
        subscribeButtonTextTest(undefined, undefined, done);
    });

    it("should show the remove text if there is a subscription", (done) => {
        subscribeButtonTextTest({ id: 1234 }, "Remove from My Drugs", done);
    });

    it("should unsubscribe if the user is already subscribed and they click the button", (done) => {
        subscribeButtonServiceTest({ id: 1234 }, "unsubscribe", [1234], done);
    });

    it("should subscribe if the user isn't already subscribed and they click the button", (done) => {
        subscribeButtonServiceTest(undefined, "subscribe", [1], done);
    });
});
