"use strict";
let _ = require("lodash");
let Bluebird = require("bluebird");

class MockSuperagent {
    constructor() {
        this.response = {};
        this.invocation = {
            query: {},
            headers: {}
        };
    }

    get(uri) {
        this.invocation.uri = uri;
        this.invocation.method = "GET";
        return this;
    }

    del(uri) {
        this.invocation.uri = uri;
        this.invocation.method = "DELETE";
        return this;
    }

    post(uri) {
        this.invocation.uri = uri;
        this.invocation.method = "POST";
        return this;
    }

    set(key, value) {
        this.invocation.headers[key] = value;
        return this;
    }

    send(payload) {
        this.invocation.payload = payload;
        return this;
    }

    query(obj) {
        this.invocation.query = _.merge(this.invocation.query, obj);
        return this;
    }

    promise() {
        return Bluebird.resolve(this.response);
    }

    then() {
        return Bluebird.resolve(this.response);
    }

    run() {
        return this.promise();
    }

    pipe(out) {
        out.write(this.response.toJSON());
    }

    respondWith (response) {
        this.response = response;
        return this;
    }
}

module.exports = MockSuperagent;
