"use strict";
let React = require("react/addons");
let DrugStore = require("../../stores/drug_store");
let DrugChart = require("./../common/drug_chart");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let _ = require("lodash");

let drugStore = new DrugStore();

const DATE_RANGE_MIN = "20050101",
      DATE_RANGE_MAX = "20150101";

let DrugStats = React.createClass({

    propTypes: {
        dataId: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            loadingStats: true,
            loadingChart: true
        };
    },


    /*
     * Fetch data on mount
     */
    componentDidMount: function () {
        this.getStateFromStore(this.props.dataId);
    },


    /*
     * Update state based on prop changes
     */
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.dataId !== this.props.dataId) {
            this.getStateFromStore(nextProps.dataId);
        }
    },


    /*
     * Fetch data for the chart
     */
    getStateFromStore: function (id) {
        this.setState({loadingStats: true, loadingChart: true, loadingEnforcements: true});

        drugStore.getDrugStats(id).then((stats) => {
            this.setState({stats: stats, loadingStats: false});
        }).catch((err) => {
            console.log("error loading drug stats", err);
            this.setState({loadingStats: false});
        });

        drugStore.getEventCounts(id, DATE_RANGE_MIN, DATE_RANGE_MAX).then((events) => {
            let chartData = this._transformDataForChart(events);
            let totalEvents = this._getTotalEvents(events);
            this.setState({totalEvents: totalEvents, chartData: chartData, loadingChart: false});
        }).catch((err) => {
            console.log("error loading chart data", err);
            this.setState({loadingChart: false});
        });

        drugStore.getEnforcementCounts(id).then((enforcements) => {
            let count = 0;
            if (enforcements.length) {
                count = enforcements[0].count;
            }
            this.setState({totalEnforcements: count, loadingEnforcements: false});
        }).catch((err) => {
            console.log("error loading enforcements", err);
            this.setState({loadingEnforcements: false});
        });
    },


    /*
     * Aggregate the data by year and return labels/values
     */
    _transformDataForChart: function (data) {
        let val = _.chain(data)
            .groupBy((item) => {
                return (item.time + "").substr(0, 4); // year
            })
            .reduce((result, value, year) => {
                result[year] = value.length;
                return result;
            }, {})
            .value();

        return {
            labels: _.keys(val),
            values: _.values(val)
        };
    },

    _getTotalEvents: function (data) {
        return _.chain(data)
            .reduce((result, value) => {
                return result + value.count;
            }, 0)
            .value();
    },

    _formatNumber: function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    _getClassNameForBadge: function () {
        let className = "badge--a";
        if (this.state.stats.totalDeaths > 1000) {
            className = "badge--f";
        } else if (this.state.stats.totalDeaths > 500) {
            className = "badge--d";
        } else if (this.state.stats.totalDeaths > 250) {
            className = "badge--c";
        } else if (this.state.stats.totalDeaths > 100) {
            className = "badge--b";
        }
        return className;
    },

    _getLetterGradeForBadge: function () {
        let grade = "A";
        if (this.state.stats.totalDeaths > 1000) {
            grade = "F";
        } else if (this.state.stats.totalDeaths > 500) {
            grade = "D";
        } else if (this.state.stats.totalDeaths > 250) {
            grade = "C";
        } else if (this.state.stats.totalDeaths > 100) {
            grade = "B";
        }
        return grade;
    },

    _renderStats: function () {
        if (this.state.loadingStats || this.state.loadingChart || this.state.loadingEnforcements) {
            return (<div key="loading" className={"drug-details__stats__loading"}>Loading drug stats...</div>);
        }
        return (
            <div key="stats">
                <div className="col-3">
                    <div className={"badge badge--grade badge--large " + this._getClassNameForBadge()}>
                        <div className="badge__circle">
                            <div className="badge__circle__number">
                                { this._getLetterGradeForBadge() }
                            </div>
                        </div>
                        <div className="badge__label">
                            DrugFax Rating
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <h3>{this._formatNumber(this.state.stats.totalDeaths || 0)}</h3>
                    <h5>Deaths</h5>
                </div>
                <div className="col-3">
                    <h3>{this._formatNumber(this.state.totalEvents || 0)}</h3>
                    <h5>Adverse events</h5>
                </div>
                <div className="col-3">
                    <h3>{this.state.totalEnforcements || 0}</h3>
                    <h5>Enforcements</h5>
                </div>
            </div>
        );
    },

    render: function() {
        return (
            <div>
                <ReactCSSTransitionGroup component="div" className="drug-details__stats" transitionName="transition" transitionAppear={true}>
                    {this._renderStats()}
                </ReactCSSTransitionGroup>
                <h5>Adverse events over time</h5>
                <DrugChart options={this.state.chartData || {labels: []}} loading={this.state.loadingChart}/>
            </div>
        );
    }
});

module.exports = DrugStats;
