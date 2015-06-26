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
            data: [],
            currentRequest: null
        };
    },

    _performQuery: function (query) {

        // cancel exesting request
        if (this.state.currentRequest) {
            this.state.currentRequest.cancel();
        }

        // perform query
        let qs = `openfda.brand_name:${query}+OR+openfda.substance_name:${query}+OR+openfda.manufacturer_name:${query}`;
        let req = store.list({search: qs, limit: 10}).then((res) => {
            this.setState({data: res.body.data, loading: false, currentRequest: null});
        }, (err) => {
            if (err && err.name !== "CancellationError") {
                this.setState({data: [], loading: false, currentRequest: null});
            }
        });

        // track this request
        this.setState({currentRequest: req});
    },

    _handleSearch: function (query) {
        this.setState({ value: query });
        if (query) {
            this.setState({loading: true});
            this._performQuery(query);
        } else {
            this.setState({data: [], loading: false});
        }
    },

    _getClassNames: function () {
        return this.props.params.drugId ? "drugs drugs--populated" : "drugs";
    },

    render: function() {
        let list = null;

        if (this.state.data.length && !this.state.loading) {
            list = <DrugList key={this.state.value} data={this.state.data}/>;
        }
        return (
            <div className={this._getClassNames()}>
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
