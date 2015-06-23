"use strict";

let React = require("react");
let findDOMNode = React.findDOMNode;

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
                <div className={"loginComponent__loginOptions__container"}>
                    <div className={"loginComponent__loginOptions__container__oauthLogin"}>
                        <span>Sign In</span>
                        <div className={"loginComponent__loginOptions__container__oauthLogin__twitterLogin"}>
                            <span className={"button button--primary button--large button--withIcon"}>
                                <i className={"fa fa-twitter"}></i>
                                <span className={"text-md"}>SIGN IN WITH TWITTER</span>
                            </span>
                        </div>
                        <div className={"loginComponent__loginOptions__container__oauthLogin__facebookLogin"}>
                            <span className={"button button--primary button--large button--withIcon"}>
                                <i className={"fa fa-facebook"}></i>
                                <span className={"text-md"}>SIGN IN WITH FACEBOOK</span>
                            </span>
                        </div>
                    </div>
                    <div className={"muted text-md centered padded"}>-or-</div>
                    <div className={"loginComponent__loginOptions__container__demoLogin"}>
                        <span className={"button button--primary button--large text-md"}>Demo Account</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = LoginComponent;
