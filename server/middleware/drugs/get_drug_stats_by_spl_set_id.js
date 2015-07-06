"use strict";
let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");
let OpenFDABadRequest = require("../../errors/openfda_bad_request");

const TOTAL_NUMBER_OF_EVENTS = 5;

/**
 * Returns a sex for the given number
 */
let getSexFromNumber = (num) => {
    if (num === "2") {
        return "F";
    } else if (num === "1") {
        return "M";
    }
    return "U";
};

/**
 * Constructs a base drug events search
 */
let baseDrugEventSearch = (countTerm, splSetId, count, reactionType) => {
    let splFilter = `(patient.drug.openfda.spl_set_id="${splSetId}")`;
    if (reactionType) {
        splFilter += `+AND+(patient.reaction.reactionmeddrapt:${reactionType})`;
    }
    return drugs().events()
        .search(splFilter).parent()
        .count(countTerm)
        .run()
        .then((resp) => resp.results.slice(0, Math.min(count, resp.results.length)));
};

/**
 * Returns the top events by drug id
 */
let topDrugEvents = baseDrugEventSearch.bind(this, "patient.reaction.reactionmeddrapt.exact");

/**
 * Returns the total number of events per sex
 */
let drugEventsBySex = baseDrugEventSearch.bind(this, "patient.patientsex");

/**
 * Counts the number of deaths related to this specific drug
 */
let drugDeathCounts = (splSetId, count) => {
    return topDrugEvents(splSetId, count, "death")
        .then((counts) => counts.length ? counts[0].count : 0);
};

module.exports = (req, res) => {
    let splSetId = req.params.splSetId;
    return topDrugEvents(splSetId, TOTAL_NUMBER_OF_EVENTS)
        .then((events) => ({
            topEvents: events.map((evt) => ({ event: evt.term, count: evt.count }))
        }))
        .then((soFar) => drugEventsBySex(splSetId, 2).then((resp) => {
            soFar.sexEvents = resp.map((item) => ({
                sex: getSexFromNumber(item.term),
                count: item.count
            }));
            return soFar;
        }))
        .then((soFar) => drugDeathCounts(splSetId, 2).then((resp) => {
            soFar.totalDeaths = resp;
            return soFar;
        }))
        .then((resp) => {
           res.send(resp);
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 404) {
                res.send(apiInvoker.EMPTY_RESULT);
            } else {
                console.log(err);
                throw new OpenFDABadRequest(err.response && err.response.body);
            }
        });
};
