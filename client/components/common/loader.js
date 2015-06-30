"use strict";

let React = require("react/addons");

let Loader = React.createClass({
    render: function() {
        return (
            <div key="loader" className="loader">
                <svg className="circular">
                    <circle className="path" cx="25" cy="25" r="10" fill="none" strokeWidth="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        );
    }
});

module.exports = Loader;
