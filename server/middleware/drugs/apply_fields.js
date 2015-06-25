"use strict";


/**
 * Finds all props in the given map that start with the given string
 * @param {Map[String]} map The string map
 * @param {String} startString The string to search for
 */
let getPropsThatStartWith = (map, startString) => {
    let finalMap = {};
    let count = 0;
    for (let key in map) {
        if (key.startsWith(startString)) {
            finalMap[key.replace(startString, "")] = true;
            count++;
        }
    }
    return {
        map: finalMap,
        count: count
    };
};

/**
 * Applies the given field map to the result, returning only fields that are in the field map
 */
let applyFields = (map, result) => {
    let final = {};
    for (let key in result) {
        if (result.hasOwnProperty(key)) {
            let type = typeof result[key];
            if (map[key]) {
                final[key] = result[key];
            } else if (type === "object") {
                let props = getPropsThatStartWith(map, key + ".");
                if (props.count) {
                    final[key] = applyFields(props.map, result[key]);
                }
            }
        }
    }
    return final;
};

module.exports = applyFields;
