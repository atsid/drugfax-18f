"use strict";

let React = require("react");
let StyledButton = require("./common/styledButton");
let authentication = require("../security/auth");
var Navigation = require("react-router").Navigation;

/**
 * The login component
 */
let LoginComponent = React.createClass({
    propTypes: {
        location: React.PropTypes.object
    },

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    mixins: [Navigation],

    getInitialState() {
        return {
          error: false
        };

    },

    /**
     * Handles the login button clicks
     * @param {String} type The type of login
     */
    handleLogin(type) {
        authentication.login(type).then((success) => {
            if (success) {
                var location = this.props.location;
                if (location && location.state && location.state.nextPathname) {
                    this.replaceWith(location.state.nextPathname);
                } else {
                    this.replaceWith("/");
                }
            } else {
                this.setState({ error: true });
            }
        }, () => {
            this.setState({ error: true });
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
                    <StyledButton icon="fa-twitter" className={"button--twitter button--large button--rounded button--block"} onClick={ () => this.handleLogin("twitter") }>
                        <span>SIGN IN WITH TWITTER</span>
                    </StyledButton>
                    <StyledButton icon="fa-facebook" className={"button--facebook button--large button--rounded button--block"} onClick={ () => this.handleLogin("facebook") }>
                        <span>SIGN IN WITH FACEBOOK</span>
                    </StyledButton>
                    <div className={"seperator-or"}>or</div>
                    <StyledButton className={"button--demo button--block button--large button--rounded"} onClick={ () => this.handleLogin("demo") }>
                        <span>DEMO ACCOUNT</span>
                    </StyledButton>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = LoginComponent;
