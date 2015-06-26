"use strict";
let React = require("react/addons");
let auth = require("../security/auth");

/**
 * The logout component
 */
let LogoutComponent = React.createClass({

    componentDidMount: function () {
        auth.logout();
    },

    render() {
        return (<div></div>);
    }
});

module.exports = LogoutComponent;
