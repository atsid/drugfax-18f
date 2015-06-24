"use strict";

let React = require("react");

let ParentComponent = React.createClass({

    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    render: function() {
        return (
            <div className={"app-container"}>
                The App
                {this.props.children}
            </div>
        );
    }
});

module.exports = ParentComponent;
