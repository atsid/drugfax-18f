"use strict";

let React = require("react");
let NavigationComponent = require("./navigationComponent");
let NavigationItemStore = require("../stores/navigationItemStore");
let store = new NavigationItemStore();

let AppComponent = React.createClass({

    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    render: function() {
        var navItems = store.list();
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
