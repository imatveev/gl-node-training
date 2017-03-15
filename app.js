"use strict";

const http = require("http");

let server = http.createServer();
const getPrimeNumber = (min, max) => {
    if (max < min) {
        return { error: "Incorrect range" };
    }

    let primes = [];

    for (let i = 0; i <= max; i++) {
        primes[i] = 0;
    }

    for (let i = 3; i * i <= max; i++) {
        for (let j = i + i; j <= max; j = j + i) {
            primes[j] = 1;
        }
    }

    min = min % 2 === 0 ? min + 1 : min;
    for (let i = min; i <= max; i += 2) {
        if (!primes[i]) {
            return { primeNumber: i };
        }
    }

    return "Prime number is not found for this range";
};

server.on("request", (req, res) => {
    router(req.url, req.method)(req, res);
});

let router = (url, method) => {
    let routes = {
        POST: {
            "/prime_number": (req, res) => {
                let body = [];
                req.on("data", data => {
                    body.push(data);
                });
                req.on("end", () => {
                    let totalBuffer = Buffer.concat(body);
                    let interval = JSON.parse(totalBuffer.toString());
                    let result = getPrimeNumber(parseInt(interval[0]), parseInt(interval[1]));
                    res.end(JSON.stringify(result));
                });
            }
        },
        GET: {
            "/": (req, res) => {
                serve(req, res, (error, qqq) => {
                    console.log(error);
                });
            },
            "/all_primes": (req, res) => {
                res.end(JSON.stringify({ error: 'Not implemented' }));
            }
        },
        "default": (req, res) => {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    };
    return routes[method][url] || routes.default;
};

server.listen(3000, () => {
    console.log("Started");
});
