"use strict";

let drugs = require("../../components/drugs_api");

/**
 * Sanitizes the given manufacturer name for use with the openfda API
 * @param name The name of the manufacturer
 */
let sanitizeName = (name) => {
    // Commas seem to choke up the openFDA API even though it is in a quote
    return name.replace(/,/g, "");
};

/**
 * Returns the total number of drugs for the given manufacturer
 */
let getManufacturerTotalDrugsByName = (name) => {
    return drugs()
        .search(`openfda.manufacturer_name:\"${sanitizeName(name)}\"`).parent()
        .count("openfda.spl_set_id.exact")
        .limit(1000) // Arbitrary limit since counting doesn't return a total
        .run()
        .then((resp) => resp.results.length);
};

/**
 * Returns the stats for a particular manufacturer by name
 */
let getManufacturerStatsByName = (name) => {
    let errorHandler = (resolve, reject, totalDrugs) => {
        return (err) => {
            if (err.status === 404) {
                resolve({
                    totalIncidents: 0,
                    totalDrugs: totalDrugs,
                    grade: 100
                });
            } else {
                reject(err);
            }
        };
    };
    return new Promise((resolve, reject) => {
        getManufacturerTotalDrugsByName(name)
            .then((totalDrugs) => {
                return drugs().enforcements()
                    .search(`openfda.manufacturer_name:\"${sanitizeName(name)}\"`).parent()
                    .count("classification.exact")
                    .run()
                    .then((resp) => {
                        let myItem = {};
                        let classifications = {};
                        let totalIncidents = 0;
                        resp.results.forEach((classification) => {
                            classifications[classification.term.toLowerCase().replace(" ", "_")] = classification.count;
                            totalIncidents += classification.count;
                        });
                        myItem.classificationCounts = classifications;
                        myItem.totalIncidents = totalIncidents;
                        myItem.grade = Math.max((1 - (totalIncidents / totalDrugs)) * 100, 0);
                        myItem.totalDrugs = totalDrugs;
                        resolve(myItem);
                    }, errorHandler(resolve, reject, totalDrugs));
            }, errorHandler(resolve, reject, 0));
      });
};

module.exports = getManufacturerStatsByName;
