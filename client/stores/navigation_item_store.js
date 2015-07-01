"use strict";
let auth = require("../security/auth");

/**
 * A data store for navigation items
 */
class NavigationItemStore {

    list() {
        return [{
            name: "Drug search",
            icon: "medkit",
            route: "drugs"
        }, {
            name: "Manufacturer search",
            icon: "hospital-o",
            route: "manufacturers"
        }, {
            name: "My Drugs",
            icon: "star",
            route: "myDrugs"
        }, {
            name: "My Profile",
            icon: "user",
            route: "myProfile"
        }, {
            name: "Logout",
            icon: "sign-out",
            action: () => auth.logout()
        }];
    }
}

module.exports = NavigationItemStore;
