"use strict";

var jsdom = require("jsdom");


// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.window = document.parentWindow;
global.navigator = window.navigator;

var chai = require("chai");
global.expect = chai.expect;
global.assert = chai.assert;

let React = require("react/addons");
var helpers = {
    util: {
        fakePromise() {
            var me = {
                then: function(callback) {
                    me.thenHandler = callback;
                }
            };

            me.trigger = function(...args) {
                if (me.thenHandler) {
                    me.thenHandler.apply(this, args);
                }
            };

            return me;
        },
        getStubRouter(type, stubs) {
            function RouterStub() { }

            Object.assign(type === "object" ? RouterStub.prototype : RouterStub, {
                makePath () {},
                makeHref () {},
                transitionTo () {},
                replaceWith () {},
                goBack () {},
                getCurrentPath () {},
                getCurrentRoutes () {},
                getCurrentPathname () {},
                getCurrentParams () {},
                getCurrentQuery () {},
                isActive () {},
                getRouteAtDepth() {},
                setRouteComponentAtDepth() {}
            }, stubs);

            return type === "object" ? new RouterStub() : RouterStub;
        },
        stubRouterContext(Component, routerType, props, stubs) {
            return React.createClass({
                childContextTypes: {
                    router: routerType === "object" ? React.PropTypes.object : React.PropTypes.func,
                    routeDepth: React.PropTypes.number
                },

                getChildContext () {
                    return {
                        router: helpers.util.getStubRouter(routerType, stubs),
                        routeDepth: 0
                    };
                },

                render () {
                    return (<Component {...props} />);
                }
            });
        }
    }
};

module.exports = helpers;
