"use strict";

const http = require("http");

let server = http.createServer();

const getPrimeNumber = (min, max) => {
    if (max < min) {
        return "Incorrect range";
    }

    var primes = [];

    for (var i = 0; i <= max; i++) {
        primes[i] = 0;
    }

    for (var i = 3; i * i <= max; i++) {
        for (var j = i + i; j <= max; j = j + i) {
            primes[j] = 1;
        }
    }

    min = min % 2 === 0 ? min + 1 : min;
    for (var i = min; i <= max; i += 2) {
        if (!primes[i]) {
            return i;
        }
    }

    return "Prime number is not found for this range";
};

server.on("request", (req, res) => {
    if (req.method === "POST") {
        router(req.url)(req, res);
    }
    else {
        res.end("Not developed yet");
    }
});

let router = url => {
    let routes = {
        "/prime_number": (req, res) => {
            let body = [];
            req.on("data", data => {
                body.push(data);
            });
            req.on("end", () => {
                let totalBuffer = Buffer.concat(body);
                let interval = JSON.parse(totalBuffer.toString());
                let result = getPrimeNumber(interval[0], interval[1]);
                res.end(result + "");
            });
        },
        "default": (req, res) => {
            res.end("Not found");
        }
    };
    return routes[url] || routes.default;
};

server.listen(3000, (error) => {
    console.log("Started");
});
