"use strict";

/**
 * Represents a generic search object
 */
class OpenFDASearch {

    /**
     * Constructor for the search
     * @param {Object parent A reference to the parent of this search
     */
    constructor(parent) {
        this.parentRef = parent;
        this.searchStatements = [];
        this.groups = [];
    }

    /**
     * Builds the final search url
     */
    buildUrl() {
        var finalUrl = this.searchString ? "(" + this.searchString + ")" : "";
        if (this.groups.length) {
            if(finalUrl) {
                finalUrl += "+AND+";
            }
            finalUrl += "(";
            for (let i = 0; i < this.groups.length; i++) {
                let group = this.groups[i];
                finalUrl += group.buildUrl();
            }
            finalUrl += ")";
        }
        for (let i = 0; i < this.searchStatements.length; i++) {
            let statement = this.searchStatements[i];

            // Its not useful if we don't have an initial statement
            finalUrl += (finalUrl ? statement.operator : "") + "(" + statement.value + ")";
        }
        return finalUrl;
    }

    /**
     * The initial search string
     * @param {String} str The search string
     */
    search(str) {
        this.searchString = str;
        return this;
    }

    /**
     * Adds an OR to the search
     * @param {String} statement The search statement
     */
    or(statement) {
        this.searchStatements.push({ operator: "+", value: statement });
        return this;
    }

    /**
     * Adds an AND to the search
     * @param {String} statement The search statement
     */
    and(statement) {
        this.searchStatements.push({ operator: "+AND+", value: statement });
        return this;
    }

    /**
     * Creates a search group
     */
    group(str) {
        var group = new OpenFDASearch(this);
        this.groups.push(group);
        return group.search(str);
    }

    /**
     * Returns to the parent search group or api
     */
    parent() {
        return this.parentRef;
    }
}

module.exports = OpenFDASearch;
