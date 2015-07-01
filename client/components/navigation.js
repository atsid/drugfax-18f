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
                    <Link className={"nav__items__item"} onClick={this.onItemClick.bind(this, item)} to={item.route} key={item.name}>
                        <i className={classes}/>
                        <span className={"nav__items__item__label"}>{item.name}</span>
                    </Link>
                );
            } else {
                elements.push(
                    <div className={"nav__items__item"} onClick={this.onItemClick.bind(this, item)} key={item.name}>
                        <i className={classes}/>
                        <span className={"nav__items__item__label"}>{item.name}</span>
                    </div>
                );
            }
        }
        return elements;
    },

    onItemClick: function (item) {
        if (item.action) {
            item.action();
        } else {
            this.onHamburgerClick();
        }
    },

    onHamburgerClick() {
        this.setState({ expanded: !this.state.expanded });
    },

    render() {
        let navItemsClasses = "nav__items";
        let navClasses = "nav";
        if (this.state.expanded) {
            navItemsClasses += " nav__items--expanded";
            navClasses += " nav--expanded";
        }

        return (
            <div className={navClasses}>
                <div className={"nav__hamburger"} onClick={this.onHamburgerClick}>
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
