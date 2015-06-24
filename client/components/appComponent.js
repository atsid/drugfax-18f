"use strict";

let React = require("react");
let NavigationComponent = require("./navigationComponent");

let AppComponent = React.createClass({

    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    render: function() {
        var navItems = [{
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
        }];
        return (
            <div className={"app-container"}>
                <NavigationComponent items={navItems} />
                <div className={"app-container__content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = AppComponent;
