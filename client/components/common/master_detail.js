"use strict";

let React = require("react/addons");
let SearchField = require("./search_field");
let EmptyState = require("./empty_state");
let ListDisplay = require("./list_display");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let { messageStore } = require("./message_store");

const PAGE_SIZE = 40;

/**
 * A generic component for controlling a master detail type view
 */
let MasterDetail = React.createClass({
    propTypes: {
        route: React.PropTypes.object,
        params: React.PropTypes.object,
        children: React.PropTypes.node
    },

    /**
     * Returns the initial state for the master/detail
     */
    getInitialState: function() {
        return {
            value: "",
            skip: 0,
            total: 0,
            data: null,
            currentRequest: null,
            hasQueried: false,
            loading: false,
            collapseSearch: !!this.props.params.detailId
        };
    },

    /**
     * If our props are changed restart this beast
     */
    componentWillReceiveProps: function(nextProps) {
        // This is necessary cause React reuses components if it can
        if (this.props.route &&
            nextProps.route &&
            this.props.route.path !== nextProps.route.path) {
            this.setState(this.getInitialState());
        }
    },

    componentWillUnmount: function () {
        this._canclePossibleRequest();
    },

    /**
     * Gets a prop by a given name from either the master detail config or from props
     */
    getProp(name, otherProps) {
        let route = (otherProps ? otherProps : this.props.route) || {};
        let config = route.masterDetailConfig || {};

        // On load, set the props to the ones retrieved from the route definition (if any)
        return config[name] || this.props[name];
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

        let req = this.getProp("store").listByName(query, skip, PAGE_SIZE).then((res) => {
            if (res.data !== null) {
                let data = this.state.data;
                data = data ? data.concat(res.data) : res.data;
                this.setState({data: data, loading: false, currentRequest: null, hasQueried: data.length > 0 || this.state.hasQueried, total: res.total });
            } else {
                this.setState({data: null, loading: false, currentRequest: null});
            }
        });

        this.setState({currentRequest: req, skip: skip, loading: true});
    },

    /*
     * Handle a user initiated search
     */
    _handleSearch: function (query) {
        if (query !== this.state.value) {
            this.setState({ data: null, value: query });
            if (query ) {
                this._performQuery(query, 0);
            }
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
        let classes = [this.getProp("itemName") || "generic", "master-detail"];
        if (this.props.params.detailId) {
            classes.push("master-detail--populated");
        }
        if (this.state.hasQueried) {
            classes.push("master-detail--has-queried");
        }
        if (this.state.collapseSearch) {
            classes.push("master-detail--collapse-search");
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
                    {this.state.total ?
                        <div className="result-count"><span className="result-count__number">{this.state.total}</span> results found</div>
                        : null}
                    <ListDisplay containerHeight={250}
                            itemName={this.getProp("itemName")}
                            itemComponent={this.getProp("listItem")}
                            itemHeight={this.getProp("itemHeight")}
                            onInfiniteLoad={this._handleInfiniteLoad}
                            onItemClick={this._handleItemClicked}
                            isInfiniteLoading={this.state.loading} key={this.state.value} data={this.state.data}/>
                </div>
            );
        }
        return list;
    },

    _renderHelpText: function () {
        if (!this.state.hasQueried && !this.state.data && !this.props.params.detailId && !this.state.loading) {
            return (
                <EmptyState iconClass="fa-search">
                    Hi! Welcome to DrugFax.
                    <br/>
                    { this.getProp("masterSearchPlaceholder") || "Search" }.
                </EmptyState>
            );
        }
    },

    /**
     * Renders the empty state for the list view
     */
    _renderEmptyState: function () {
        if (this.state.data && this.state.data.length === 0) {
            return (
                <EmptyState iconClass="fa-frown-o">
                    No results for "{this.state.value}"
                </EmptyState>
            );
        }
    },

    _handleItemClicked: function () {
        if (!this.state.collapseSearch) {
            this._toggleCollapseSearch();
        }
    },

    _toggleCollapseSearch: function () {
        this.setState({collapseSearch: !this.state.collapseSearch});
    },

    render: function() {
        return (
            <div className={this._getClassNames()}>
                <div className={"master-detail__master"}>
                    <i onClick={this._toggleCollapseSearch} className={"fa " + (this.state.collapseSearch ? "fa-search" : "fa-angle-double-right")}></i>
                    <SearchField key={this.getProp("itemName")} onSearch={this._handleSearch} loading={this.state.loading} placeholder={this.getProp("masterSearchPlaceholder") || "Search"}/>
                    <ReactCSSTransitionGroup transitionName="transition" transitionAppear={true}>
                        {this._renderList()}
                    </ReactCSSTransitionGroup>
                    {this._renderHelpText()}
                    {this._renderEmptyState()}
                </div>
                <div className={"master-detail__details"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = MasterDetail;
