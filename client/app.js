"use strict";

let React = require("react");
let { Router, Route } = require("react-router");
let BrowserHistory = require("react-router/lib/BrowserHistory");

let AppComponent = require("./components/appComponent");
let LoginComponent = require("./components/loginComponent");
let ChildComponent = require("./components/childComponent");
let auth = require("./security/auth");
let utils = require("./common/utils");

var isLoggedInGuard = utils.createGuardComponent.bind(this, () => auth.isLoggedIn());

window.onload = function () {
    React.render((
        <Router history={new BrowserHistory()}>
            <Route path="/" component={isLoggedInGuard(AppComponent, { state: "login"}) }>
                <Route path="child" component={ChildComponent}/>
            </Route>
            <Route path="/login" component={LoginComponent} />
        </Router>
    ), document.getElementById("app"));
};
