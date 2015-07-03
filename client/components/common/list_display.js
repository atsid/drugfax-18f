"use strict";

let React = require("react/addons");
let Infinite = require("react-infinite");
let { Navigation } = require("react-router");

let ListDisplay = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired,
        itemComponent: React.PropTypes.func.isRequired,
        itemName: React.PropTypes.string.isRequired,
        itemHeight: React.PropTypes.number.isRequired,
        onInfiniteLoad: React.PropTypes.func,
        isInfiniteLoading: React.PropTypes.bool,
        onItemClick: React.PropTypes.func
    },

    mixins: [Navigation],

    getInitialState: function () {
        return this._getContainerHeight();
    },


    /*
     * Update the dimensions and listen
    },for window resize events
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
        return { height: window.innerHeight - 107 };
    },

    /*
     * Update state with the new preferred list dimensions
     */
    _updateDimensions: function() {
        this.setState(this._getContainerHeight());
    },

    render: function() {
        let ItemComponent = this.props.itemComponent;
        return (
            <div className={"list-display " + this.props.itemName + "-list"} ref="myList">
                <Infinite elementHeight={this.props.itemHeight}
                            containerHeight={this.state.height}
                            onInfiniteLoad={this.props.onInfiniteLoad}
                            loadingSpinnerDelegate={null}
                            infiniteLoadBeginBottomOffset={200}
                            isInfiniteLoading={this.props.isInfiniteLoading}>
                    {this.props.data.map((item, i) => {
                        return <ItemComponent onItemClick={this.props.onItemClick} data={item} key={i}/>;
                    })}
                </Infinite>
            </div>
        );
    }
});

module.exports = ListDisplay;
