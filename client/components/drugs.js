"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let SearchField = require("./common/searchField");
let DrugList = require("./drugList");

let Drugs = React.createClass({

    propTypes: {
        params: React.PropTypes.object,
        children: React.PropTypes.node
    },

    getInitialState: function() {
        return {
            value: "",
            data: []
        };
    },

    handleSearchChange: function (query) {
        if (query.length) {
            this.setState({
                value: query,
                data: [{
                    brandName: "Advil",
                    manufacturerName: "Pfizer"
                }, {
                    brandName: "Advil PM",
                    manufacturerName: "Pfizer"
                }]
            });
        } else {
            this.setState({
                value: query,
                data: []
            });
        }
    },

    render: function() {
        let list = null,
            classNames = ["drugs"];

        if (this.props.params && this.props.params.drugId) {
            classNames.push("drugs--populated");
        }

        if (this.state.data.length) {
            list = (
                <ReactCSSTransitionGroup transitionName="drug-list--fade" transitionAppear={true}>
                    <DrugList data={this.state.data}/>
                </ReactCSSTransitionGroup>
            );
        }
        return (
            <div className={classNames.join(" ")}>
                <div className={"drugs__master"}>
                    <SearchField onChange={this.handleSearchChange} placeholder={"Search for drugs and medication"}/>
                    {list}
                </div>
                <div className={"drugs__details"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Drugs;
