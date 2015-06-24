"use strict";

let React = require("react/addons");
let DrugListItem = require("./drugListItem");
let { Navigation } = require("react-router");

let DrugList = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    mixins: [Navigation],

    handleItemClick: function () {
        this.transitionTo("drugs/1");
    },

    render: function() {
        return (
            <div className={"drug-list"}>
                {this.props.data.map((result) => {
                    return <DrugListItem onClick={this.handleItemClick} data={result} key={result.brandName}/>;
                })}
            </div>
        );
    }
});

module.exports = DrugList;
