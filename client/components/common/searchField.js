"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let Loader = require("./loader");

let ENTER_KEY_CODE = 13;

let SearchField = React.createClass({

    propTypes: {
        onSearch: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        loading: React.PropTypes.bool
    },

    getInitialState: function() {
        return {value: ""};
    },

    _onChange: function(event) {
        this.setState({value: event.target.value});
    },

    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            let value = this.state.value.trim();
            if (value) {
                this.props.onSearch(value);
            }
        }
    },

    render: function() {
        let classNames = ["search-field"];
        if (this.props.loading) {
            classNames.push("search-field--loading");
        }
        return (
            <div className={classNames.join(" ")}>
                <input
                    autoFocus={true}
                    value={this.state.value}
                    placeholder={this.props.placeholder || ""}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    type="text"
                    maxLength="150"/>
                <i className={"fa fa-search"}></i>
                <ReactCSSTransitionGroup transitionName="transition" transitionAppear={true}>
                    { this.props.loading ? <Loader/> : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

module.exports = SearchField;
