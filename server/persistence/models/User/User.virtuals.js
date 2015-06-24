"use strict";

module.exports = [
    {
        name: "name.full",
        get: function () {
            return `${this.name.first} ${this.name.last}`;
        }
    }
];
