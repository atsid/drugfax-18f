"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let SearchField = require("./common/searchField");
let DrugList = require("./drugList");
let DrugStore = require("../stores/drugStore");

let store = new DrugStore();

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

    _performQuery: function (query) {
        let qs = `openfda.brand_name:${query}+OR+openfda.substance_name:${query}+OR+openfda.manufacturer_name:${query}`;
        store.list({search: qs, limit: 10}).then((res) => {
            this.setState({data: res.body.data, loading: false});
        }, () => {
            this.setState({data: [], loading: false});
        });
    },

    _handleSearch: function (query) {
        this.setState({
            value: query
        });
        if (query.length) {
            this.setState({loading: true});
            this._performQuery(query);
        } else {
            this.setState({data: [], loading: false});
        }
    },

    render: function() {
        let list = null,
            classNames = ["drugs"];

        if (this.props.params && this.props.params.drugId) {
            classNames.push("drugs--populated");
        }

        if (this.state.data.length && !this.state.loading) {
            list = (
                <DrugList key={this.state.value} data={this.state.data}/>
            );
        }
        return (
            <div className={classNames.join(" ")}>
                <div className={"drugs__master"}>
                    <SearchField onSearch={this._handleSearch} loading={this.state.loading} placeholder={"Search for drugs and medication"}/>
                    <ReactCSSTransitionGroup transitionName="transition" transitionAppear={true}>
                        {list}
                    </ReactCSSTransitionGroup>
                </div>
                <div className={"drugs__details"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Drugs;
