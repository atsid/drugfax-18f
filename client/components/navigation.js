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
            let classes = "nav__items__item__icon fa fa-" + item.icon;

            if (item.route) {
                elements.push(
                    <Link className={"nav__items__item"} to={item.route} key={item.name}>
                        <i className={classes} title={item.description}/>
                        <span className={"nav__items__item__label"}>{item.name}</span>
                    </Link>
                );
            } else {
                elements.push(
                    <div className={"nav__items__item"} onClick={item.action} key={item.name}>
                        <i className={classes} title={item.description}/>
                        <span className={"nav__items__item__label"}>{item.name}</span>
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
        var navItemsClasses = "nav__items";
        if (this.state.expanded) {
            navItemsClasses += " nav__items--expanded";
        }
        return (
            <div className={"nav"}>
                <div className={"nav__hamburger"} onClick={this.onHambugerClick}>
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
