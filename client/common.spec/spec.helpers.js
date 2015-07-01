"use strict";

var jsdom = require("jsdom");


// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.window = document.parentWindow;
global.navigator = window.navigator;

let React = require("react/addons");
var helpers = {
    util: {
        fakePromise() {
            var me = {
                then: function(callback, failureCallback) {
                    me.thenHandler = callback;
                    me.failureHandler = failureCallback;
                }
            };

            me.trigger = function(...args) {
                if (me.thenHandler) {
                    me.thenHandler.apply(this, args);
                }
            };

            me.triggerFailure = function(...args) {
                if (me.failureHandler) {
                    me.failureHandler.apply(this, args);
                }
            };

            return me;
        },

        fakeComponent(className, props) {
            /*eslint-disable react/no-multi-comp*/
            let componentDef = {
                render () {
                    for (let key in this.props) {
                        component[key] = this.props[key];
                    }
                    return (<div {...this.props} className={(className ? className + "-" : "") + "fake-component"} ></div>);
                }
            };

            let component = React.createClass(Object.assign(componentDef, props || {}));
            return component;
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
        stubRouterContext(Component, routerType, stubs) {
            return React.createClass({
                propTypes: {
                    children: React.PropTypes.node
                },
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
                    return (<Component {...this.props}>{ this.props.children }</Component>);
                }
            });
        }
    }
};

module.exports = helpers;
