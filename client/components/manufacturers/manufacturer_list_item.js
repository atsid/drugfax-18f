"use strict";

let React = require("react/addons");
let { Link } = require("react-router");

let ManufacturerListItem = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function() {
        var name = this.props.data && this.props.data.name;
        return (
            <Link to={`/manufacturers/${encodeURIComponent(name)}`} className={"manufacturer-list__item"}>
                <div className={"manufacturer-list__item__name"}>{name}</div>
            </Link>
        );
    }
});

module.exports = ManufacturerListItem;
