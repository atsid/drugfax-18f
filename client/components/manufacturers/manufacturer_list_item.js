"use strict";

let React = require("react/addons");
let { Link } = require("react-router");

let ManufacturerListItem = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <Link to={`/manufacturers/${encodeURIComponent(this.props.data.name)}`} className={"manufacturer-list__item"}>
                <div className={"manufacturer-list__item__name"}>{this.props.data.name}</div>
            </Link>
        );
    }
});

module.exports = ManufacturerListItem;
