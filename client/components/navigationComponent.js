"use strict";

let React = require("react");
let { Link } = require("react-router");

let NavigationComponent = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    getInitialState() {
        return {
            expanded: false
        };
    },

    buildItemElements() {
        let elements = [];
        let navItems = this.props.items || [];
        for (let i = 0; i < navItems.length; i++) {
            let item = navItems[i];
            let classes = "navItem__icon fa fa-" + item.icon;

            if (item.route) {
                elements.push(
                    <Link to={item.route} key={item.name}>
                        <div classNames={"navItems__navItem"}>
                            <i className={classes} title={item.description}/>
                            <span className={"navItem__label"}>{item.name}</span>
                        </div>
                    </Link>
                );
            } else {
                elements.push(
                    <div classNames={"navItems__navItem"} onClick={item.action}>
                        <i className={classes} title={item.description}/>
                        <span className={"navItem__label"}>{item.name}</span>
                    </div>
                );
            }
        }
        return elements;
    },

    onHambugerClick() {
        this.setState({ expanded: !this.state.expanded });
    },

    render() {
        var navItemsClasses = "navigationComponent__navItems";
        if (this.state.expanded) {
            navItemsClasses += " navigationComponent__navItems--expanded";
        }
        return (
            <div className={"navigationComponent"}>
                <div className={"navigationComponent__hamburger"} onClick={this.onHambugerClick}>
                    <i className={"fa fa-bars"}></i>
                </div>
                <div className={navItemsClasses}>
                    {this.buildItemElements()}
                </div>
            </div>
        );
    }
});


module.exports = NavigationComponent;
