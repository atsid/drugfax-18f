"use strict";
let React = require("react/addons");
let Loader = require("./common/loader");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let Bluebird = require("bluebird");
let ListDisplay = require("./common/list_display");
let DrugListItem = require("./drugs/drug_list_item");

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
            .then((subscriptions) => Bluebird.all(subscriptions.map((sub) => drugStore.get(sub.splSetId))))
            .then((subscribedDrugs) => this.setState({subscriptions: subscribedDrugs, loading: false}))
            .catch(() => this.setState({loading: false}));
    },

    render: function () {
        let subs = [];
        this.state.subscriptions.forEach((sub) => {
            subs.push(<li><span>{sub.openfda.brand_name[0]}</span></li>);
        });

        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { !this.state.loading ?
                        <div>
                            <h1>Saved Drugs</h1>
                            <ListDisplay
                                itemName={"drug"}
                                itemComponent={DrugListItem}
                                key={this.state.value}
                                data={this.state.subscriptions}/>
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
