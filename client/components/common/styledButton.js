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
        var buttonClassNames = "button button--primary button--large" + (this.props.icon ? "  button--withIcon" : "");
        var buttonTextClassNames = "button__text text-md";
        if (this.props.className) {
            buttonClassNames = this.props.className + " " + buttonClassNames;
        }
        return (
            <span className={buttonClassNames}>
                { this.props.icon ? <i className={iconClassNames}></i> : null }
                <span className={buttonTextClassNames}>{this.props.children}</span>
            </span>
        );
    }
});

module.exports = StyledButton;
