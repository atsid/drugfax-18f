let BaseService = require("../baseService");
class OpenFDADrugsEvents extends BaseService {
    constructor(api) {
        super(api, "/drug/event.json");
    }
}

module.exports = OpenFDADrugsEvents;
