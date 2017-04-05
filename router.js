"use strict";

const fs     = require('fs');
const router = require("koa-router")();
const models = require("./models");
const utils  = require('./utils');

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
            this.body = yield new models.User({ name: "John"}).save();
        } catch (err) {
            this.throw("Unable to save user");
        }
    })
    .post("/prime_number", function *(next) {
        console.log('CONTROLLER');
        let interval = yield utils.getRequestBody(this.req);

        let worker = utils.getWorker();

        let result = yield utils.processInterval(worker, interval);

        this.body = result;
    })
    .use('', function*(next){
        // this.status = 203;
        console.log('First preprocessor');

        yield next;
    })
    .use('', function*(next) {
        console.log('Second preprocessor');

        yield next;
    })
    .all("*", function *() {
        // default route, not found
        this.status = 404;
        this.body = {error: 'Route not found'};
    });

module.exports = router;
