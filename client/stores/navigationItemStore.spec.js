"use strict";
let NavItemStore = require("./navigationItemStore");


describe("The NavigationItem Store", () => {
    let store = null;
    beforeEach(() => store = new NavItemStore());

    it("Can retrieve navigation items", () => {
        let items = store.list();
        expect(items).to.an.array;
        expect(items.length > 0).to.be.true;
        items.forEach((item) => {
            expect(item).to.be.an.object;
            expect(item.description).to.be.a.string;
            expect(item.icon).to.be.a.string;
            expect(item.name).to.be.a.string;
            expect(item.route || item.action).to.be.ok;
            if (item.route) {
                expect(item.route).to.be.a.string;
            }
            if (item.action) {
                expect(item.action).to.be.a.function;
            }
        });
    });
});
