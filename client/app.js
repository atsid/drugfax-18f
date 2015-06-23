"use strict";

let React = require("react");
let { Router, Route } = require("react-router");
let BrowserHistory = require("react-router/lib/BrowserHistory");

let ParentComponent = require("./components/parentComponent");
let ChildComponent = require("./components/childComponent");

window.onload = function () {
    React.render((
        <Router history={new BrowserHistory()}>
            <Route path="/" component={ParentComponent}>
                <Route path="child" component={ChildComponent}/>
            </Route>
        </Router>
    ), document.getElementById("app"));
};
