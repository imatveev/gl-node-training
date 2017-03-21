"use strict";

module.exports.getRequestBody = getRequestBody;

function getRequestBody(req) {
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
    })
}
