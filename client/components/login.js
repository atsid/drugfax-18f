"use strict";

let React = require("react/addons");
let StyledButton = require("./common/styled_button");
let authentication = require("../security/auth");
var Navigation = require("react-router").Navigation;
let Toast = require("./common/toast");
let { messageStore } = require("./common/message_store");

const GITHUB_URL = "https://github.com/atsid/18f-RFQ993471-POOL2";
const ATSID_URL = "https://atsid.github.io";

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
        <div className={"login" + (this.state.error ? " login--error" : "")}>
            <Toast store={messageStore} />
            <div className={"login__details"}>
                <div className={"center-vh"}>
                    <h1>DrugFax</h1>
                    <h2>Don't run the risk of buying pills with costly hidden problems. Shop with confidence for medicine with the DrugFax drug history that's right for you.</h2>
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
                <div className={"login__options__disclaimer"}>
                    <span>
                        THIS IS NOT AN OFFICIAL U.S. GOVERNMENT WEBSITE. This website is a prototype solely intended for use by Applied Technical Systems Inc. for the purpose of responding to a solicitation by the U.S. Government. The health and medical information on this prototype website is not intended to provide advice or treatment from healthcare professionals, and should not be relied upon for same.
                    </span>
                </div>
                <div className={"login__options__footer"}>
                    <div className={"pull-left"}>
                        <a target="_blank" href={GITHUB_URL}>View project on Github</a>
                    </div>
                    <div className={"pull-right"} >
                        <a target="_blank" href={ATSID_URL}>Made with ❤ by atsid</a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = LoginComponent;
