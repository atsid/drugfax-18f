"use strict";

let React = require("react/addons");
let DrugListItem = require("./drugListItem");
let Infinite = require("react-infinite");
let { Navigation } = require("react-router");

let DrugList = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired,
        onInfiniteLoad: React.PropTypes.func.isRequired,
        isInfiniteLoading: React.PropTypes.bool.isRequired
    },

    mixins: [Navigation],

    getInitialState: function () {
        return this._getContainerHeight();
    },


    /*
     * Update the dimensions and listen for window resize events
     */
    componentDidMount: function() {
        this._updateDimensions();
        window.addEventListener("resize", this._updateDimensions);
    },


    /*
     * Stop listening for window resize events
     */
    componentWillUnmount: function() {
        window.removeEventListener("resize", this._updateDimensions);
    },


    /*
     * Determine the preferred container height
     */
    _getContainerHeight: function () {
        return { height: window.innerHeight - 106 };
    },


    /*
     * Update state with the new preferred list dimensions
     */
    _updateDimensions: function() {
        this.setState(this._getContainerHeight());
    },


    render: function() {
        return (
            <div className={"drug-list"} ref="drugList">
                <Infinite elementHeight={65}
                            containerHeight={this.state.height}
                            onInfiniteLoad={this.props.onInfiniteLoad}
                            loadingSpinnerDelegate={null}
                            infiniteLoadBeginBottomOffset={200}
                            isInfiniteLoading={this.props.isInfiniteLoading}>
                    {this.props.data.map((item) => {
                        return <DrugListItem data={item} key={item.set_id}/>;
                    })}
                </Infinite>
            </div>
        );
    }
});

module.exports = DrugList;
