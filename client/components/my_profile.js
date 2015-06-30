"use strict";
let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let Loader = require("./common/loader");
let Bluebird = require("bluebird");
let ProfileStore = require("../stores/profile_store");

let profileStore = new ProfileStore();

let MyProfile = React.createClass({

    getInitialState: function () {
        return {
            loading: true,
            profile: null
        };
    },

    componentDidMount: function () {
        this.getStateFromStore(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.getStateFromStore(nextProps.params);
    },

    getStateFromStore: function () {
        this.setState({loading: true});
        Bluebird.all([
            profileStore.get()
        ]).spread((profile) => {
            this.setState({loading: false, profile: profile});
        }).catch((err) => {
            console.log("error loading store data", err);
            this.setState({loading: false});
        });
    },

    render: function() {
        let profileBits = [];
        let addProfileBit = (key, value) => {
            if (value) {
                profileBits.push(
                    <div>
                        <span>{key}:&nbsp;</span>
                        <span>{value}</span>
                    </div>
                );
            }
        };

        if (this.state.profile) {
            addProfileBit("Name", this.state.profile.name);
            addProfileBit("Email", this.state.profile.email);
            addProfileBit("Facebook Token", this.state.profile.facebookId);
            addProfileBit("Twitter Token", this.state.profile.twitterId);
        }

        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { !this.state.loading && this.state.profile ?
                        <div key="my-profile" className={"my-profile"}>
                            <h1>My Profile</h1>
                            {profileBits}
                        </div> : null
                    }
                    { this.state.loading ? <Loader/> : null }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
module.exports = MyProfile;
