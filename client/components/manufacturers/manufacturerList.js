"use strict";

let React = require("react/addons");
let ManufacturerListItem = require("./manufacturerListItem");
let { Navigation } = require("react-router");

let ManufacturerList = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    mixins: [Navigation],

    handleItemClick: function () {
        this.transitionTo("manufacturers/1");
    },

    render: function() {
        return (
            <div className={"manufacturer-list"}>
                {this.props.data.map((item) => {
                    return <ManufacturerListItem onClick={this.handleItemClick} data={item} key={item.set_id}/>;
                })}
            </div>
        );
    }
});

module.exports = ManufacturerList;
