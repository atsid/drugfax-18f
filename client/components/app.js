"use strict";

let React = require("react");
let Navigation = require("./navigation");
let NavigationItemStore = require("../stores/navigation_item_store");
let store = new NavigationItemStore();
let Toast = require("./common/toast");
let { messageStore } = require("./common/message_store");

let AppComponent = React.createClass({

    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    render: function() {
        var navItems = store.list();
        return (
            <div className={"app-container"}>
                <Navigation items={navItems} />
                <Toast store={messageStore} />
                <div className={"app-container__content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = AppComponent;
