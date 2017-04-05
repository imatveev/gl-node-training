"use strict";

const koa = require("koa");
const router = require("./router");

const app = koa();

let portIndex = process.argv.findIndex(argument => argument.includes('port'));

let port = process.argv[ portIndex + 1 ];
if (portIndex === -1) {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Server listening on ${port} port`);
});
app.use(router.routes()).use(router.allowedMethods());
