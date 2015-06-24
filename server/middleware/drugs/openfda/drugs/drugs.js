let OpenFDASearch = require("../search");
let OpenFDADrugEvents = require("./events");
let BaseService = require("../baseService");

class OpenFDADrugs extends BaseService {

    constructor(api) {
        super(api, "/drug/label.json")
        this.api = api;
    }

    events() {
        return new OpenFDADrugEvents(this.api);
    }
}

module.exports = OpenFDADrugs;
