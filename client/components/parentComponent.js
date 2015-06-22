"use strict";

let React = require("react");

let ParentComponent = React.createClass({

    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    getInitialState: function() {
        return {
            name: "Parent Component"
        };
    },

    render: function() {
        return (
            <div>
                <h3>{ this.state.name }</h3>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ParentComponent;
