"use strict";

let React = require("react/addons");
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
        router: React.PropTypes.object.isRequired
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
                <div className={"center-vh"}>
                    <h1>DrugFax</h1>
                    <h2>Don't run the risk of buying pills with costly hidden problems. Shop with confidence for medicine with the DrugFAX drug history that's right for you.</h2>
                </div>
            </div>
            <div className={"login__options"}>
                <div className={"center-vh login__options__buttons"}>
                    <h2>Sign in</h2>
                    <StyledButton icon="fa-twitter" className={"button--twitter button--large button--rounded button--block"} onClick={ () => this.handleLogin("twitter") }>
                        WITH TWITTER
                    </StyledButton>
                    <StyledButton icon="fa-facebook" className={"button--facebook button--large button--rounded button--block"} onClick={ () => this.handleLogin("facebook") }>
                        WITH FACEBOOK
                    </StyledButton>
                    <div className={"seperator--or"}>or</div>
                    <StyledButton className={"button--demo button--block button--large button--rounded"} onClick={ () => this.handleLogin("demo") }>
                        WITH DEMO ACCOUNT
                    </StyledButton>
                </div>
                <div className={"login__options__footer"}>
                    <div className={"pull-left"}>View project on Github</div>
                    <div className={"pull-right"}>Made with ❤ by atsid</div>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = LoginComponent;
