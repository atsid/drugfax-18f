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
        <div className={"loginComponent"}>
            <div className={"loginComponent__logoContainer"}>
                <div className={"loginComponent_logoContainer__logoText"}>
                    DrugFax
                </div>
            </div>
            <div className={"loginComponent__loginOptions"}>
                <div className={"loginOptions__oauthLogin"}>
                    <div>Sign In</div>
                    <StyledButton icon="fa-twitter" className={"twitterButton"}>
                        <span>SIGN IN WITH TWITTER</span>
                    </StyledButton>
                    <StyledButton icon="fa-facebook" className={"facebookButton"}>
                        <span>SIGN IN WITH FACEBOOK</span>
                    </StyledButton>
                </div>
                <div className={"muted text-md text-centered padded"}>-or-</div>
                <StyledButton className={"demoButton"}>
                    <span>DEMO ACCOUNT</span>
                </StyledButton>
            </div>
        </div>
    );
  }
});

module.exports = LoginComponent;
