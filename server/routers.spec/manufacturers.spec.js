"use strict";
let { expect } = require("chai");
let app = require("../server");
let Session = require("supertest-session")({
    app: app
});
var nock = require("nock");

let returnSampleManufacturers = () => {
    nock("https://api.fda.gov")
        .get("/drug/label.json?count=openfda.manufacturer_name.exact")
        .reply(200, require("./sample_data/manufacturer_query_results.json"));
};

let getManufacturerMetadataByName = (name) => {
    let sess = nock("https://api.fda.gov");
    sess.get(`/drug/label.json?search=(openfda.manufacturer_name%3D%22${name}%22)&count=openfda.manufacturer_name.exact`)
        .reply(200, require("./sample_data/manufacturer_query_results.json"));
};

let getManufacturerByName = (name) => {
    let sess = nock("https://api.fda.gov");
    sess.get(`/drug/label.json?search=(openfda.manufacturer_name%3A%22${name}%22)&limit=1000&count=openfda.spl_set_id.exact`)
        .reply(200, require("./sample_data/manufacturer_drugs_by_name_result.json"));
    sess.get(`/drug/enforcement.json?search=(openfda.manufacturer_name%3A%22${name}%22)&count=classification.exact`)
        .reply(200, require("./sample_data/manufacturer_event_count_by_name.json"));
};

describe("/manufacturers", () => {
    let sess = null;
    beforeEach(() => require("../startup_hooks").resolve());
    beforeEach(() => sess = new Session());
    afterEach(() => sess.destroy());

    describe("/", () => {
        it("can retrieve manufacturers from the OpenFDA Drug Label service", (done) => {
            returnSampleManufacturers();
            sess.get("/api/manufacturers/")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.data.length).to.equal(100);
                    expect(res.body.data[0].name).to.equal("REMEDYREPACK INC.");
                    done();
                });
        });

        it("can retrieve a manufacturer metadata by name", (done) => {
            getManufacturerMetadataByName("derps");
            sess.get("/api/manufacturers?search=name=\"derps\"")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.data.length).to.equal(100);
                    done();
                });
        });
    });

    describe("/by-name", () => {
        it("can retrieve a manufacturer by name", (done) => {
            getManufacturerByName("derps");
            sess.get("/api/manufacturers/by-name?name=derps")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body).to.deep.equal({
                        name: "derps",
                        stats: {
                            /*eslint-disable */
                            classificationCounts: {class_ii: 3},
                            /*eslint-enable */
                            totalIncidents: 3,
                            grade: 99.7,
                            totalDrugs: 1000
                        }
                    });
                    done();
                });
        });
    });
});
