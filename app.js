'use strict';

const http = require('http');

let server = http.createServer();

const getRandomArbitrary = ([min, max]) => Math.random() * (max - min) + min;

server.on('request', (req, res) => {
    if (req.method === 'POST') {
        router(req.url)(req, res);
    }
    else {
        res.end('Not developed yet');
    }
});

let router = url => {
    let routes = {
        '/prime_number': (req, res) => {
            let body = [];
            req.on('data', data => {
                body.push(data);
            });
            req.on('end', () => {
                let totalBuffer = Buffer.concat(body);
                let interval = JSON.parse(totalBuffer.toString());
                let result = getRandomArbitrary(interval);
                res.end(result + '');
            });
        },
        'default': (req, res) => {

            res.end('Not found');
        }
    };
    return routes[url] || routes.default;
};

server.listen(3000, (error) => {
    console.log('Started');
});
