"use strict";
let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let Loader = require("./common/loader");
let ProfileStore = require("../stores/profile_store");
let profileStore = new ProfileStore();
let Bluebird = require("bluebird");

let MyProfile = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            profile: null
        };
    },

    componentDidMount: function () {
        return this.getStateFromStore(this.props);
    },

    getStateFromStore: function () {
        this.setState({loading: true});

        Bluebird.resolve(true)
        .then(() => profileStore.get())
        .then((profile) => this.setState({loading: false, profile: profile}))
        .catch((err) => {
            console.log("error loading store data", err);
            this.setState({loading: false});
        });
    },

    render: function() {
        let profileBits = [];
        let addProfileBit = (name, key, value) => {
            if (value) {
                profileBits.push(
                    <div className={"profile_" + key} key={key}>
                        <span className="profile-key">{name}:</span>
                        <span className="profile-value">{value}</span>
                    </div>
                );
            }
        };

        if (this.state.profile) {
            addProfileBit("Name", "name", this.state.profile.name);
            addProfileBit("Email", "email", this.state.profile.email);
            addProfileBit("Facebook Token", "facebook", this.state.profile.facebookId);
            addProfileBit("Twitter Token", "twitter", this.state.profile.twitterId);
        }

        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                    { !this.state.loading ?
                        <div key="my-profile" className={"my-profile"}>
                            <h1>My profile</h1>
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
