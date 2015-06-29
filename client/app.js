"use strict";

let React = require("react/addons");
let { Router, Route, Redirect } = require("react-router");
let HashHistory = require("react-router/lib/HashHistory");

let AppComponent = require("./components/appComponent");
let Drugs = require("./components/drugs");
let DrugDetails = require("./components/drugDetails");
let MyDrugs = require("./components/myDrugs");
let LoginComponent = require("./components/loginComponent");
let MyProfile = require("./components/myProfile");
let auth = require("./security/auth");
let utils = require("./common/utils");

var isLoggedInGuard = utils.createGuardComponent.bind(this, () => auth.isLoggedIn());

window.onload = function () {
    // Facebook Authentication adds this value to the location hash
    if (window.location.hash.indexOf("_=_") > -1) {
        window.location.hash = "";
    }

    React.render((
        <Router history={new HashHistory()}>
            <Route component={isLoggedInGuard(AppComponent, { state: "login"})}>
                <Route path="drugs" component={Drugs}>
                    <Route path=":drugId" component={DrugDetails}/>
                </Route>

                <Route path="myDrugs" component={MyDrugs}>
                    <Route path=":drugId" component={DrugDetails}/>
                </Route>

                <Route path="myProfile" component={MyProfile} />
            </Route>
            <Route path="login" component={LoginComponent} />
            <Redirect from="/" to="/drugs" />
        </Router>
    ), document.getElementById("app"));
};
