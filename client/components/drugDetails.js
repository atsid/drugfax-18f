"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let DrugStore = require("../stores/drugStore");
let Loader = require("./common/loader");
let SubscriptionStore = require("../stores/subscriptionStore");

let drugStore = new DrugStore();
let subscriptionStore = new SubscriptionStore();

let DrugDetails = React.createClass({

    propTypes: {
        params: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            loading: true,
            data: null
        };
    },

    componentDidMount: function () {
        this.getStateFromStore({
            drugId: this.props.params.drugId
        });
    },

    componentWillReceiveProps(nextProps) {
        this.getStateFromStore(nextProps.params);
    },

    getStateFromStore: function (props) {
        this.setState({loading: true});
        drugStore.get(props.drugId).then((res) => {
            this.setState({data: res.body.data[0], loading: false});
        }, () => {
            this.setState({loading: false});
        });
    },

    toggleSubscription: function() {
        let splSetId = this.state.data.openfda.spl_set_id[0];
        console.log("Subscribing to ", splSetId);
        subscriptionStore.subscribe(splSetId);

    },

    render: function() {
        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { !this.state.loading && this.state.data ?
                        <div key="drug-details" className={"drug-details"}>
                            <h1>{this.state.data.openfda.brand_name[0]}</h1>
                            <h4 className={"drug-details__sub-title"}>{this.state.data.openfda.substance_name[0]}</h4>
                            <button onClick={this.toggleSubscription}>Save to My Profile</button>
                            <h5>Indications and Usage</h5>
                            <p>{this.state.data.indications_and_usage}</p>
                            <div className="row">
                                <div className="col-3">
                                    <h5>Manufacturer</h5>
                                    <p>
                                        <a>{this.state.data.openfda.manufacturer_name[0]}</a>
                                    </p>
                                </div>
                                <div className="col-3">
                                    <h5>Type</h5>
                                    <p>{this.state.data.openfda.product_type[0]}</p>
                                </div>
                                <div className="col-3">
                                    <h5>Route</h5>
                                    <p>{this.state.data.openfda.route[0]}</p>
                                </div>
                            </div>
                            <h5>Dosage and Administration</h5>
                            <p>{this.state.data.dosage_and_administration}</p>
                            <h5>Warnings</h5>
                            <p>{this.state.data.warnings}</p>
                        </div> : null
                    }
                    { this.state.loading ? <Loader/> : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
module.exports = DrugDetails;
