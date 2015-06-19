"use strict";

let React = require("react");

let ParentComponent = React.createClass({

    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    render: function() {
        return (
            <div>
                <h3>Parent Component</h3>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ParentComponent;
