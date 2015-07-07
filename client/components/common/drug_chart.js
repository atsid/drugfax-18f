"use strict";
let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let LineChart = require("react-chartjs").Line;

let DrugChart = React.createClass({

    propTypes: {
        options: React.PropTypes.object.isRequired,
        loading: React.PropTypes.bool.isRequired
    },


    /*
     * Get style options for the chart
     */
    _getChartOptions: function () {
        return {
            pointDotRadius: 6,
            datasetStrokeWidth: 4,
            pointDotStrokeWidth: 3,
            responsive: true,
            maintainAspectRatio: false
        };
    },


    /*
     * Create chart data config
     */
    _getChartData: function () {
        return {
            labels: this.props.options.labels,
            datasets: [{
                label: "Adverse Events",
                fillColor: "rgba(33, 150, 243, 0.16)",
                strokeColor: "#2196F3",
                pointColor: "#2196F3",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.props.options.values
            }]
        };
    },

    render: function() {
        return (
            <ReactCSSTransitionGroup component="div" className="chart" transitionName="transition" transitionAppear={true}>
                { !this.props.loading && !this.props.options.labels.length ? <div key="empty" className={"chart__empty"}>No data for this chart.</div> : null }
                { this.props.loading ? <div key="loading" className={"chart__loading"}>Loading chart data...</div> : null }
                { this.props.options.labels.length ? <LineChart key="chart" className={"chart"} data={this._getChartData()} options={this._getChartOptions()}/> : null }
            </ReactCSSTransitionGroup>
        );
    }
});

module.exports = DrugChart;
