"use strict";
let auth = require("../security/auth");

/**
 * A data store for navigation items
 */
class NavigationItemStore {

    list() {
        return [{
            description: "Search for information about a specific drug",
            name: "Drugs",
            icon: "medkit",
            route: "drugs"
        }, {
            description: "Search for information about a specific manufacturer",
            name: "Manufacturers",
            icon: "hospital-o",
            route: "manufacturers"
        }, {
            description: "Your saved drugs",
            name: "My Drugs",
            icon: "star",
            route: "myDrugs"
        }, {
            description: "Your profile",
            name: "My Profile",
            icon: "user",
            route: "myProfile"
        }, {
            description: "Logout",
            name: "Logout",
            icon: "sign-out",
            action: () => auth.logout()
        }];
    }
}

module.exports = NavigationItemStore;
