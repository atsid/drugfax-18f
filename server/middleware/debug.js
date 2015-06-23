"use strict";
let send = (content) => (req, res) => {
    res.json({message: content});
    res.end();
};

module.exports = {
    send
};
