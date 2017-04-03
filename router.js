const fs        = require('fs');
const router    = require("koa-router")();
const models    = require("./models");

router
    .get("/", function *(next) {
        this.set("Content-Type", "text/html");
        this.body = fs.createReadStream('./public/index.html');
    })
    .get("/all_primes", function *(next) {
        this.body = {error: 'Not implemented'};
    })
    .get("/users", function *(next) {
        try {
            this.body = yield models.User.find({});
        } catch (err) {
            this.throw("Unable to find users");
        }
    })
    .post("/users", function *(next) {
        try {
            this.body = yield new models.User({ name: "John", ssurname: "Smith" }).save();
        } catch (err) {
            this.throw("Unable to save user");
        }
    })
    .post("/prime_number", function *(next) {
        // @TODO

        // const fork     = require('child_process').fork;
        // const utils = require('./utils');

        // utils.getRequestBody(req)
        // .then(interval => {
        //     let worker = fork('./prime.js');

        //     worker.on('exit', () => {
        //         console.log('Worker killed!!!!!');
        //     });

        //     worker.on('message', result => {
        //         res.end(JSON.stringify(result));
        //     });

        //     worker.send({min: parseInt(interval[0]), max: parseInt(interval[1])});
        // });
    });

module.exports = router;