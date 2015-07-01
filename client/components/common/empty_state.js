"use strict";

let React = require("react/addons");

let EmptyState = React.createClass({

    propTypes: {
        iconClass: React.PropTypes.string,
        children: React.PropTypes.node.isRequired
    },

    render: function() {
        return (
            <div className={"empty-state"}>
                { this.props.iconClass ?
                    <div className={"empty-state__icon"}>
                        <i className={"fa " + this.props.iconClass}></i>
                    </div> : null
                }
                {this.props.children}
            </div>
        );
    }
});

module.exports = EmptyState;
