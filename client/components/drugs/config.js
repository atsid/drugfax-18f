"use strict";

let DrugStore = require("../../stores/drugStore");
let DrugListItem = require("./drugListItem");
let DrugDetails = require("./drugDetails");

module.exports = {
    detail: DrugDetails,
    store: new DrugStore(),
    itemName: "drug",
    listItem: DrugListItem,
    masterSearchPlaceholder: "Search for your drugs or medications above."
};
