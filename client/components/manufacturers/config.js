"use strict";

let ManufacturerStore = require("../../stores/manufacturerStore");
let ManufacturerListItem = require("./manufacturerListItem");
let ManufacturerDetails = require("./manufacturerDetails");

module.exports = {
    detail: ManufacturerDetails,
    store: new ManufacturerStore(),
    itemName: "manufacturer",
    listItem: ManufacturerListItem,
    masterSearchPlaceholder: "Search for a drug manufacturer."
};
