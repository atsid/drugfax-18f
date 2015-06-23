let main = require("app/main");
let startup = main.start();

module.exports = () => startup.startupPromise.then(() => startup.app);
