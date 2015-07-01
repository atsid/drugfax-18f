"use strict";

let ManufacturerStore = require("../../stores/manufacturer_store");
let ManufacturerListItem = require("./manufacturer_list_item");
let ManufacturerDetails = require("./manufacturer_details");

module.exports = {
    detail: ManufacturerDetails,
    store: new ManufacturerStore(),
    itemName: "manufacturer",
    itemHeight: 43,
    listItem: ManufacturerListItem,
    masterSearchPlaceholder: "Search for a drug manufacturer"
};
