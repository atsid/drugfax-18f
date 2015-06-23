"use strict";

let React = require("react");
let findDOMNode = React.findDOMNode;
let StyledButton = require("./common/styledButton");

var auth = {
    login: function() {

    }
};

/**
 * The login component
 */
let LoginComponent = React.createClass({
    propTypes: {
        location: React.PropTypes.object
    },

  getInitialState() {
    return {
      error: false
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    var email = findDOMNode(this.refs.email).value;
    var pass = findDOMNode(this.refs.pass).value;

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({ error: true });
      }

      var { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.replaceWith(location.state.nextPathname);
      } else {
        this.replaceWith("/");
      }
    });
  },

  render() {
    return (
        <div className={"login"}>
            <div className={"login__details"}>
                <h1>DrugFax</h1>
            </div>
            <div className={"login__options"}>
                <div className={"login__options__buttons"}>
                    <h2>Sign in</h2>
                    <StyledButton icon="fa-twitter" className={"button--twitter button--large button--rounded button--block"}>
                        <span>SIGN IN WITH TWITTER</span>
                    </StyledButton>
                    <StyledButton icon="fa-facebook" className={"button--facebook button--large button--rounded button--block"}>
                        <span>SIGN IN WITH FACEBOOK</span>
                    </StyledButton>
                    <div className={"seperator-or"}>or</div>
                    <StyledButton className={"button--block button--large button--rounded"}>
                        <span>DEMO ACCOUNT</span>
                    </StyledButton>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = LoginComponent;
