"use strict";

let React = require("react/addons");

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
