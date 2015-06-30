"use strict";
let React = require("react/addons");
let { Router, Route, Redirect } = require("react-router");
let History = require("react-router/lib/HashHistory");

let App = require("./app");
let Drugs = require("./drugs");
let DrugDetails = require("./drugDetails");
let MyDrugs = require("./myDrugs");

let Manufacturers = require("./manufacturers");
let ManufacturerDetails = require("./manufacturers/manufacturerDetails");
let Login = require("./login");
let MyProfile = require("./myProfile");
let auth = require("../security/auth");
let utils = require("../common/utils");
var isLoggedInGuard = utils.createGuardComponent.bind(this, () => auth.isLoggedIn());

let Routes = React.createClass({

    render: function() {
        return (
            <Router history={new History()}>
                <Route component={isLoggedInGuard(App, { state: "login" })}>
                    <Route path="drugs" component={Drugs}>
                        <Route path=":drugId" component={DrugDetails}/>
                    </Route>

                    <Route path="manufacturers" component={Manufacturers}>
                        <Route path="detail" component={ManufacturerDetails}/>
                    </Route>

                    <Route path="myDrugs" component={MyDrugs}>
                        <Route path=":drugId" component={DrugDetails}/>
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
