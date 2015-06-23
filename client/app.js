"use strict";

let React = require("react");
let { Router, Route } = require("react-router");
let BrowserHistory = require("react-router/lib/BrowserHistory");

let ParentComponent = require("./components/parentComponent");
let LoginComponent = require("./components/loginComponent");
let ChildComponent = require("./components/childComponent");
let auth = require("./security/auth");

function requireAuth(nextState, transition) {
    if (!auth.isLoggedIn()) {
        transition.to("/login", null, { nextPathname: nextState.location.pathname });
    }
}

window.onload = function () {
    React.render((
        <Router history={new BrowserHistory()}>
            <Route path="/" component={ParentComponent} onEnter={requireAuth}>
                <Route path="child" component={ChildComponent}/>
            </Route>
            <Route path="/login" component={LoginComponent} />
        </Router>
    ), document.getElementById("app"));
};
