"use strict";
let React = require("react/addons");
let { Router, Route, Redirect } = require("react-router");
let History = require("react-router/lib/HashHistory");
let MasterDetail = require("./common/master_detail");

let App = require("./app");
let MyDrugs = require("./my_drugs");

let Login = require("./login");
let MyProfile = require("./my_profile");
let auth = require("../security/auth");
let utils = require("../common/utils");
var isLoggedInGuard = utils.createGuardComponent.bind(this, () => auth.isLoggedIn());
let drugsConfig = require("./drugs/config");
let manufacturersConfig = require("./manufacturers/config");

let Routes = React.createClass({
    render: function() {
        return (
            <Router history={new History()}>
                <Route component={isLoggedInGuard(App, { state: "login"})}>
                    <Route path="drugs" masterDetailConfig={drugsConfig} component={MasterDetail}>
                        <Route path=":detailId" component={drugsConfig.detail} />
                    </Route>

                    <Route path="manufacturers" masterDetailConfig={manufacturersConfig} component={MasterDetail}>
                        <Route path=":detailId" component={manufacturersConfig.detail} />
                    </Route>

                    <Route path="myDrugs" component={MyDrugs}>
                        <Route path=":drugId" component={drugsConfig.detail}/>
                    </Route>

                    <Route path="myProfile" component={MyProfile} />
                </Route>
                <Route path="login" component={Login} />
                <Redirect from="/" to="/drugs" />
            </Router>
        );
    }
});

module.exports = Routes;
