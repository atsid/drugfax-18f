"use strict";
let React = require("react/addons");
let Drugfax = require("./components/drugfax");
window.onload = function () {
    // Facebook Authentication adds this value to the location hash
    if (window.location.hash.indexOf("_=_") > -1) {
        window.location.hash = "";
    }
    React.render(<Drugfax />, document.getElementById("app"));
};
