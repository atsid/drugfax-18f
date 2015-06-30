"use strict";
let { util } = require("../common.spec/spec.helpers");
let rewire = require("rewire");
let { Router, Route, Redirect } = require("react-router");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let MyDrugs = rewire("./my_drugs");
let { expect, assert } = require("chai");
let Bluebird = require("bluebird");

describe("MyDrugs Component", () => {
    it("should load", function () {
        let Stubbed = util.stubRouterContext(MyDrugs, "object");
        let data = null;
        let subscriptions = [];
        return MyDrugs.__with__({
            "drugStore": {get: () => Bluebird.resolve(data)},
            "subscriptionStore": {list: () => Bluebird.resolve(subscriptions)}
        })(() => {
            var rendered = ReactTestUtils.renderIntoDocument(<Stubbed />);
            return new Promise((resolve) => {
                setImmediate(() => {
                    expect(rendered).to.exist;
                    resolve();
                });
            });
        });
    });

    it("should present a user's subscriptions", function () {
        let Stubbed = util.stubRouterContext(MyDrugs, "object");
        let drugs = {
            /*eslint-disable */
            "abc": {openfda: {brand_name: ["tylenol"], manufacturer_name: ["drug_co"]}},
            "def": {openfda: {brand_name: ["aspirin"], manufacturer_name: ["drug_co"]}}
             /*eslint-enable */
        };
        let subscriptions = [
            {splSetId: "abc"},
            {splSetId: "def"}
        ];
        return MyDrugs.__with__({
            "drugStore": {get: (id) => Bluebird.resolve(drugs[id])},
            "subscriptionStore": {list: () => Bluebird.resolve({items: subscriptions})}
        })(() => {
            var rendered = ReactTestUtils.renderIntoDocument(
                <Stubbed />
            );
            return new Promise((resolve) => {
                setImmediate(() => {
                    let brands = ReactTestUtils.scryRenderedDOMComponentsWithClass(rendered, "drug-list__item__brand_name");
                    expect(brands.length).to.equal(2);
                    resolve();
                });
            });
        });
    });
});
