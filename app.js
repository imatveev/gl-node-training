"use strict";

const koa = require("koa");
const router = require("./router");

const app = koa();
app.listen(3000);

app.use(router.routes())
    .use(router.allowedMethods())
    .use(function *(next) {
        // default route, not found
        this.status = 404;
        this.body = {error: 'Route not found'};
    });