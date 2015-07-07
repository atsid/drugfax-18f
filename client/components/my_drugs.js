"use strict";
let React = require("react/addons");
let Loader = require("./common/loader");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let Bluebird = require("bluebird");
let ListDisplay = require("./common/list_display");
let DrugListItem = require("./drugs/drug_list_item");
let EmptyState = require("./common/empty_state");

let SubscriptionStore = require("../stores/subscription_store");
let DrugStore = require("../stores/drug_store");

let subscriptionStore = new SubscriptionStore();
let drugStore = new DrugStore();

let MyDrugs = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            subscriptions: []
        };
    },

    componentDidMount: function () {
        this.getStateFromStore();
    },

    getStateFromStore: function () {
        this.setState({loading: true});
        subscriptionStore.list({
            fields: "openfda.brand_name"
        })
            .then((result) => result.items)
            .then((subscriptions) => subscriptions ? Bluebird.all(subscriptions.map((sub) => drugStore.get(sub.splSetId))) : [])
            .then((subscribedDrugs) => this.setState({subscriptions: subscribedDrugs, loading: false}))
            .catch((err) => {
                console.error("Error loading subscriptions", err, err.stack);
                this.setState({loading: false});
            });
    },

    _getEmptyState: function () {
        return (
            <EmptyState>
                <div>No saved drugs yet.</div>
                <div>Search for drugs, then save them for later.</div>
            </EmptyState>
        );
    },

    render: function () {
        let subs = [];
        this.state.subscriptions.forEach((sub) => {
            let brand = sub.openfda.brand_name[0];
            subs.push(<li><span>{brand}</span></li>);
        });
        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { !this.state.loading ?
                        <div className="my-drugs">
                            <h1>My saved drugs</h1>
                            { this.state.subscriptions.length ?
                                <ListDisplay
                                    itemName={"drug"}
                                    itemHeight={65}
                                    itemComponent={DrugListItem}
                                    key={this.state.value}
                                    data={this.state.subscriptions}/>
                                : this._getEmptyState() }
                        </div>
                        : null
                    }
                    { this.state.loading ? <Loader/> : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

module.exports = MyDrugs;
