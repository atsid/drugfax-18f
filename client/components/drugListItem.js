"use strict";

let React = require("react/addons");

let DrugListItem = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func
    },

    render: function() {
        return (
            <div onClick={this.props.onClick} className={"drug-list__item"}>
                <div className={"drug-list__item__brand_name"}>{this.props.data.brandName}</div>
                <div className={"drug-list__item__manufacturer_name"}>{this.props.data.manufacturerName}</div>
            </div>
        );
    }
});

module.exports = DrugListItem;
