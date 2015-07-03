"use strict";

let React = require("react");
let { Navigation } = require("react-router");
let Bluebird = require("bluebird");

module.exports = {
    /**
    * Asynchronously guard the Component router handler with the given function.  If the
    * function fails (i.e. the Promise resolves with a falsey value) then redirect to
    * the given state and parameters.
    *
    * @param fn The guard function, returning a Promise
    * @param Component The React component used as the route handler
    * @param state The name of the state to redirect to if the guard fails
    * @returns {*}
    */
    createGuardComponent(fn, Component, { state }) {
        return React.createClass({
            displayName: `${Component.displayName}(Guarded)`,
            propTypes: {
                children: React.PropTypes.node.isRequired
            },
            mixins: [Navigation],
            getInitialState() {
                return {
                    loaded: false
                };
            },
            componentWillMount() {
                fn().then((value) => {
                    if (!value) {
                        this.transitionTo(state);
                    } else {
                        this.setState({ loaded: true });
                    }
                });
            },
            render() {
                return ( this.state.loaded ? (<Component {...this.props} >{ this.props.children } </Component>) : null );
            }
        });
    },

    animationPromise(delay) {
        return new Bluebird((resolve) => {
            setTimeout(resolve, delay);
        });
    }
};
