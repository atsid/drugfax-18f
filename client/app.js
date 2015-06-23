"use strict";

let React = require("react");
let { Router, Route } = require("react-router");
let BrowserHistory = require("react-router/lib/BrowserHistory");

let ParentComponent = require("./components/parentComponent");
let LoginComponent = require("./components/loginComponent");
let ChildComponent = require("./components/childComponent");

let auth = {
    isLoggedIn: function() { return false; }
};

function requireAuth(nextState, transition) {
    if (!auth.loggedIn()) {
        transition.to("/login", null, { nextPathname: nextState.location.pathname });
    }
}

window.onload = function () {
    React.render((
        <Router history={new BrowserHistory()}>
            <Route path="/" component={ParentComponent}>
                <Route path="login" component={LoginComponent} />
                <Route path="child" component={ChildComponent} onEnter={requireAuth}/>
            </Route>

        </Router>
    ), document.getElementById("app"));
};
