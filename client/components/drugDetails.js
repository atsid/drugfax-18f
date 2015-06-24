"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let DrugDetails = React.createClass({

    propTypes: {
        params: React.PropTypes.object
    },

    render: function() {
        return (
            <ReactCSSTransitionGroup transitionName="drug-details--fade" transitionAppear={true}>
                <div className={"drug-details"}>
                    <h1>Advil Liquigels</h1>
                    <h4 className={"drug-details__sub-title"}>IBUPROFEN</h4>
                    id: {this.props.params.drugId}
                </div>
            </ReactCSSTransitionGroup>
        );
    }
});

module.exports = DrugDetails;
