"use strict";

let React = require("react/addons");

let StyledButton = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string
    },

    getInitialState: function() {
        return {value: ""};
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    },

    render: function() {
        return (
            <div className={"search-field"}>
                <input autoFocus={true} value={this.state.value} placeholder={this.props.placeholder || ""} onChange={this.handleChange} type="text" maxLength="150"/>
                <i className={"fa fa-search"}></i>
            </div>
        );
    }
});

module.exports = StyledButton;
