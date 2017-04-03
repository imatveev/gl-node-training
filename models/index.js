const fs = require("fs");
let models = fs.readdirSync(__dirname);

models.forEach( modelFilename => {
    if (modelFilename !== __filename) {
        module.exports[modelFilename.split(".")[0]] = require(`./${modelFilename}`);
    }
});