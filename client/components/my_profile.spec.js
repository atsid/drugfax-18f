"use strict";
require("../common.spec/spec.helpers");
let rewire = require("rewire");
let React = require("react/addons");
let ReactTestUtils = React.addons.TestUtils;
let MyProfile = rewire("./my_profile");
let { expect, assert } = require("chai");
let Bluebird = require("bluebird");

describe("MyProfile Component", () => {
    it("should load", function () {
        let data = null;
        return MyProfile.__with__({"profileStore": {get: () => Bluebird.resolve(data)}})(() => {
            var renderedComponent = ReactTestUtils.renderIntoDocument(
                <MyProfile />
            );
            expect(renderedComponent).to.exist;
        });
    });

    it("should load the profile from the profile store", () => {
        let data = {
            name: "Herp D. Derp",
            email: "herp@derp.com",
            facebookId: 12345,
            twitterId: 45678
        };
        return MyProfile.__with__({"profileStore": {get: () => Bluebird.resolve(data)}})(() => {
            return new Promise((resolve) => {
                var rendered = ReactTestUtils.renderIntoDocument(
                    <MyProfile />
                );
                setImmediate(() => {
                    ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "profile_name");
                    ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "profile_email");
                    ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "profile_facebook");
                    ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "profile_twitter");
                    resolve();
                });
            });
        });
    });

    it("can load a partial profile", () => {
        let data = {
            name: "Herp D. Derp"
        };
        return MyProfile.__with__({"profileStore": {get: () => Bluebird.resolve(data)}})(() => {
            return new Promise((resolve) => {
                var rendered = ReactTestUtils.renderIntoDocument(
                    <MyProfile />
                );
                setImmediate(() => {
                    ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "profile_name");
                    let emailBlock = ReactTestUtils.scryRenderedDOMComponentsWithClass(rendered, "profile_email");
                    expect(emailBlock.length).to.equal(0);
                    resolve();
                });
            });
        });
    });

    it("can gracefully handle a load failure", () => {
        return MyProfile.__with__({"profileStore": {get: () => Bluebird.reject(new Error("SERVICE ERROR"))}})(() => {
            return new Promise((resolve) => {
                var rendered = ReactTestUtils.renderIntoDocument(
                    <MyProfile />
                );
                setImmediate(() => {
                    ReactTestUtils.findRenderedDOMComponentWithClass(rendered, "my-profile");
                    resolve();
                });
            });
        });
    });
});
