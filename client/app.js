"use strict";

let React = require("react");
let { Router, Route } = require("react-router");
let HashHistory = require("react-router/lib/HashHistory");

let ParentComponent = require("./components/parentComponent");
let ChildComponent = require("./components/childComponent");


window.onload = function () {
    React.render((
        <Router history={new HashHistory()}>
            <Route path="/" component={ParentComponent}>
                <Route path="child" component={ChildComponent}/>
            </Route>
        </Router>
    ), document.getElementById("app"));
};
