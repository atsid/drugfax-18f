"use strict";
let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let DrugStore = require("../../stores/drug_store");
let DrugStats = require("./../common/drug_stats");
let Loader = require("./../common/loader");
let StyledButton = require("./../common/styled_button");
let SubscriptionStore = require("../../stores/subscription_store");
let Bluebird = require("bluebird");
let animationPromise = require("../../common/utils").animationPromise;
let { Link } = require("react-router");

let drugStore = new DrugStore();
let subscriptionStore = new SubscriptionStore();

let DrugDetails = React.createClass({

    propTypes: {
        params: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            loading: true
        };
    },

    componentDidMount: function () {
        this.getStateFromStore({
            detailId: this.props.params.detailId
        });
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.params.detailId !== this.props.params.detailId) {
            this.getStateFromStore(nextProps.params);
        }
    },

    getStateFromStore: function (props) {
        this.setState({data: null, loading: true});
        Bluebird.all([
            drugStore.get(props.detailId),
            subscriptionStore.getSubscription(props.detailId),
            animationPromise(250)
        ]).spread((drug, subscription) => {
            this.setState({data: drug, loading: false, subscription: subscription});
        }).catch((err) => {
            console.log("error loading store data", err);
            this.setState({loading: false});
        });
    },

    toggleSubscription: function() {
        let detailId = this.props.params.detailId;
        let subscription = this.state.subscription;
        if (subscription) {
            return subscriptionStore.unsubscribe(subscription.id)
            .then(() => this.setState({subscription: null}));
        } else {
            subscriptionStore.subscribe(detailId)
            .then((sub) => this.setState({subscription: sub}));
        }
    },

    subscribeText: function() {
        return this.state.subscription ? "Remove from my profile" : "Save to my profile";
    },

    subscribeButtonClass: function() {
        return this.state.subscription ? "unsubscribe" : "subscribe";
    },

    subscribeButtonIcon: function() {
        return this.state.subscription ? "fa-times-circle-o" : "fa-star-o";
    },

    render: function() {
        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { !this.state.loading && this.state.data ?
                        <div key="drug-details" className={"drug-details"}>
                            <StyledButton icon={this.subscribeButtonIcon()} className={"pull-right button--large button--primary " + this.subscribeButtonClass()} disabled={this.state.loading} onClick={this.toggleSubscription}>{this.subscribeText()}</StyledButton>
                            <h1>{this.state.data.openfda.brand_name[0]}</h1>
                            <h4 className={"drug-details__sub-title"}>{this.state.data.openfda.generic_name[0]}</h4>
                            <h5>Indications and Usage</h5>
                            <p>{this.state.data.indications_and_usage}</p>
                            <div className="row">
                                <div className="col-4">
                                    <h5>Manufacturer</h5>
                                    <p>
                                        <Link to={"/manufacturers/" + encodeURIComponent(this.state.data.openfda.manufacturer_name[0])}>{this.state.data.openfda.manufacturer_name[0]}</Link>
                                    </p>
                                </div>
                                <div className="col-4">
                                    <h5>Type</h5>
                                    <p>{this.state.data.openfda.product_type ? this.state.data.openfda.product_type[0] : "n/a"}</p>
                                </div>
                                <div className="col-4">
                                    <h5>Route</h5>
                                    <p>{this.state.data.openfda.route ? this.state.data.openfda.route[0] : "n/a"}</p>
                                </div>
                            </div>
                            <DrugStats dataId={this.props.params.detailId}/>
                            <h5>Dosage and Administration</h5>
                            <p>{this.state.data.dosage_and_administration}</p>
                            <h5>Warnings</h5>
                            <p>{this.state.data.warnings}</p>
                        </div> : null
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { this.state.loading ? <Loader/> : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
module.exports = DrugDetails;
