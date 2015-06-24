"use strict";

module.exports = (location) => {
    return (req, res) => res.redirect(location);
};
