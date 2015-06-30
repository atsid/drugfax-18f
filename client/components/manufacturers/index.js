"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let SearchField = require("./../common/searchField");
let ManufacturerList = require("./manufacturerList");
let ManufacturersStore = require("../../stores/manufacturerStore");

let store = new ManufacturersStore();

let Manufacturers = React.createClass({

    propTypes: {
        location: React.PropTypes.object,
        children: React.PropTypes.node
    },

    getInitialState: function() {
        return {
            value: "",
            data: []
        };
    },

    _performQuery: function (query) {
        let qs = `name:${query}`;
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
            classNames = ["manufacturers"];
        let { query } = this.props.location;

        if (query && query.name) {
            classNames.push("manufacturers--populated");
        }

        if (this.state.loading) {
            classNames.push("manufacturers--loading");
        }

        let data = this.state.data || [];
        if (data.length && !this.state.loading) {
            list = (
                <ManufacturerList key={this.state.value} data={this.state.data}/>
            );
        }
        return (
            <div className={classNames.join(" ")}>
                <div className={"manufacturers__master"}>
                    <SearchField onSearch={this._handleSearch} loading={this.state.loading} placeholder={"Search for manufacturers"}/>
                    <ReactCSSTransitionGroup transitionName="transition" transitionAppear={true}>
                        {list}
                    </ReactCSSTransitionGroup>
                </div>
                <div className={"manufacturers__details"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Manufacturers;
