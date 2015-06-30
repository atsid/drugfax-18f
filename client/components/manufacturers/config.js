"use strict";

let ManufacturerStore = require("../../stores/manufacturer_store");
let ManufacturerListItem = require("./manufacturer_list_item");
let ManufacturerDetails = require("./manufacturer_list_item");

module.exports = {
    detail: ManufacturerDetails,
    store: new ManufacturerStore(),
    itemName: "manufacturer",
    listItem: ManufacturerListItem,
    masterSearchPlaceholder: "Search for a drug manufacturer"
};
