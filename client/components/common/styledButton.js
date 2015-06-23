"use strict";

let React = require("react");

let StyledButton = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.node,
        icon: React.PropTypes.string
    },
    render: function() {
        var iconClassNames = "button__icon fa " + this.props.icon;
        var buttonClassNames = "button";
        if (this.props.className) {
            buttonClassNames = this.props.className + " " + buttonClassNames;
        }
        return (
            <button className={buttonClassNames}>
                { this.props.icon ? <i className={iconClassNames}></i> : null }
                {this.props.children}
            </button>
        );
    }
});

module.exports = StyledButton;
