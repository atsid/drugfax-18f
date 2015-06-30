"use strict";

let DrugStore = require("../../stores/drug_store");
let DrugListItem = require("./drug_list_item");
let DrugDetails = require("./drug_details");

module.exports = {
    detail: DrugDetails,
    store: new DrugStore(),
    itemName: "drug",
    listItem: DrugListItem,
    masterSearchPlaceholder: "Search for drugs and medications"
};
