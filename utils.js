"use strict";

const fork = require('child_process').fork;

module.exports = {
    getRequestBody(req) {
        return new Promise((resolve, reject) => {
            let body = [];

            req.on("data", data => {
                body.push(data);
            });

            req.on("error", data => {
                reject(data);
            });

            req.on("end", () => {
                let totalBuffer = Buffer.concat(body).toString();
                let parsedBody;

                try {
                    parsedBody = JSON.parse(totalBuffer);
                } catch (e) {
                    parsedBody = totalBuffer;
                }

                resolve(parsedBody);
            });
        });
    },
    processInterval(worker, [ min, max ]) {
        return new Promise(resolve => {
            worker.send({ min: parseInt(min), max: parseInt(max) });
            worker.on('message', result => {
                resolve(result);
            });
        });
    },
    getWorker(){
        return fork('./prime.js')
        .on('exit', () => {
            console.log('Worker killed!!!!!');
        });
    }
};
