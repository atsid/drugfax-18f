"use strict";

let React = require("react/addons");
let { Link } = require("react-router");

let DrugListItem = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
        onItemClick: React.PropTypes.func
    },

    render: function() {
        return (
            <Link onClick={this.props.onItemClick} to={`/drugs/${this.props.data.set_id}`} className={"drug-list__item"}>
                <div className={"drug-list__item__brand_name"}>{this.props.data.openfda.brand_name[0]}</div>
                <div className={"drug-list__item__manufacturer_name"}>{this.props.data.openfda.manufacturer_name[0]}</div>
            </Link>
        );
    }
});

module.exports = DrugListItem;
