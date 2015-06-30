"use strict";

let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let Loader = require("./loader");

let ENTER_KEY_CODE = 13;

let SearchField = React.createClass({

    propTypes: {
        onSearch: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        loading: React.PropTypes.bool,
        key: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {value: ""};
    },

    /**
     * If our props are changed restart this beast
     */
    componentWillReceiveProps: function(nextProps) {
        // This is necessary cause React reuses components if it can
        if (this.props.key !== nextProps.key) {
            this.setState(this.getInitialState());
        }
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

    _onSearchIconClick: function () {
        this.refs.searchInput.getDOMNode().focus();
    },

    render: function() {
        let classNames = ["search-field"];
        if (this.props.loading) {
            classNames.push("search-field--loading");
        }
        return (
            <div className={classNames.join(" ")}>
                <input
                    ref="searchInput"
                    autoFocus={true}
                    value={this.state.value}
                    placeholder={this.props.placeholder || ""}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    type="text"
                    maxLength="150"/>
                <i onClick={this._onSearchIconClick} className={"fa fa-search"}></i>
                <ReactCSSTransitionGroup transitionName="transition" transitionAppear={true}>
                    { this.props.loading ? <Loader/> : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

module.exports = SearchField;
