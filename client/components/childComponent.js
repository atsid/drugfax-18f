"use strict";

let React = require("react");

let ChildComponent = React.createClass({
    render: function() {
        return (
            <div>
                <p>Child Component!</p>
            </div>
        );
    }
});

module.exports = ChildComponent;
