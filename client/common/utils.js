"use strict";

let React = require("react");
let { Navigation } = require("react-router");
let request = require("request");

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
                return (
                    <div>
                        { this.state.loaded ? <Component {...this.props} >{ this.props.children } </Component> : null }
                    </div>
                );
            }
        });
    },

    /**
     * Simple utility method to call a JSON service with a GET
     */
    getJSON(url) {
        return new Promise((resolve, reject) => {
            let baseUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
            request.get(baseUrl + url, (error, response, body) => {
                if (!error) {
                    if (response.statusCode < 400){
                        response.body = body;
                    }
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    },

    /**
     * Simple utility method to call a JSON service with a POST
     */
    postJSON(url, data) {
        return new Promise((resolve, reject) => {
            let baseUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
            var options = {
                uri: baseUrl + url,
                method: "POST",
                json: data
            };
            request(options, function (error, response, body) {
                if (!error) {
                    if (response.statusCode < 400){
                        response.body = body;
                    }
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    }
};
