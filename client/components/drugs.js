"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let SearchField = require("./common/searchField");
let DrugList = require("./drugList");
let DrugStore = require("../stores/drugStore");

let store = new DrugStore();

let PAGE_SIZE = 40;

let Drugs = React.createClass({

    propTypes: {
        params: React.PropTypes.object,
        children: React.PropTypes.node
    },

    getInitialState: function() {
        return {
            value: "",
            skip: 0,
            total: 0,
            data: null,
            currentRequest: null,
            loading: false
        };
    },

    componentWillUnmount: function () {
        this._canclePossibleRequest();
    },


    /*
     * Cancel any possible ongoing request
     */
    _canclePossibleRequest: function () {
        if (this.state.currentRequest) {
            this.state.currentRequest.cancel();
        }
    },


    /*
     * Fetch data from the store.
     * @param {String} query Search query
     * @param {Number} skip The offset amount
     */
    _performQuery: function (query, skip) {
        this._canclePossibleRequest();

        let qs = `openfda.brand_name:${query}+OR+openfda.substance_name:${query}+OR+openfda.manufacturer_name:${query}`;
        let req = store.list({search: qs, skip: skip, limit: PAGE_SIZE}).then((res) => {
            let data = this.state.data;
            if (data) {
                data = data.concat(res.body.data);
            } else {
                data = res.body.data;
            }
            this.setState({data: data, loading: false, currentRequest: null, hasQueried: data.length > 0 || this.state.hasQueried, total: res.body.meta.total });
        }, (err) => {
            if (err && err.name !== "CancellationError") {
                this.setState({data: null, loading: false, currentRequest: null});
            }
        });

        this.setState({currentRequest: req, skip: skip, loading: true});
    },


    /*
     * Handle a user initiated search
     */
    _handleSearch: function (query) {
        this.setState({ value: query });
        if (query) {
            this.setState({data: null});
            this._performQuery(query, 0);
        } else {
            this.setState({loading: false});
        }
    },


    /*
     * Handle a request to 'infinitely' load more data.
     */
    _handleInfiniteLoad: function () {
        let nextSkip = Math.min(this.state.skip + PAGE_SIZE, this.state.total);
        if (!this.state.loading && nextSkip < this.state.total) {
            this._performQuery(this.state.value, nextSkip);
        }
    },


    /*
     * Create the classNames for the root drugs element.
     */
    _getClassNames: function () {
        let classes = ["drugs"];
        if (this.props.params.drugId) {
            classes.push("drugs--populated");
        }
        if (this.state.hasQueried) {
            classes.push("drugs--has-queried");
        }
        return classes.join(" ");
    },


    /*
     * Conditionally render the list based on the state of the data.
     */
    _renderList: function () {
        let list = null;
        if (this.state.data && this.state.data.length > 0) {
            list = (
                <div key={this.state.value}>
                    <div className="result-count"><span className="result-count__number">{this.state.total}</span> results found</div>
                    <DrugList containerHeight={250}
                            onInfiniteLoad={this._handleInfiniteLoad}
                            isInfiniteLoading={this.state.loading} key={this.state.value} data={this.state.data}/>
                </div>
            );
        }
        return list;
    },

    _renderHelpText: function () {
        if (!this.state.hasQueried && !this.state.data && !this.props.params.drugId && !this.state.loading) {
            return (
                <div className={"drugs__master__empty-state"}>
                    <div className={"drugs__master__empty-state__icon"}>
                        <i className="fa fa-search"></i>
                    </div>
                    Hi! Welcome to DrugFAX.
                    <br/>
                    Search for your drugs or medications above.
                </div>
            );
        }
    },

    _renderEmptyState: function () {
        if (this.state.data && this.state.data.length === 0) {
            return (
                <div className={"drugs__master__empty-state"}>
                    <div className={"drugs__master__empty-state__icon"}>
                        <i className="fa fa-frown-o"></i>
                    </div>
                    No results for "{this.state.value}"
                </div>
            );
        }
    },

    render: function() {
        return (
            <div className={this._getClassNames()}>
                <div className={"drugs__master"}>
                    <SearchField onSearch={this._handleSearch} loading={this.state.loading} placeholder={"Search for drugs and medication"}/>
                    <ReactCSSTransitionGroup transitionName="transition" transitionAppear={true}>
                        {this._renderList()}
                    </ReactCSSTransitionGroup>
                    {this._renderHelpText()}
                    {this._renderEmptyState()}
                </div>
                <div className={"drugs__details"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Drugs;
