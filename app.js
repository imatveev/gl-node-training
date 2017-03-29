"use strict";

const http     = require("http");
const fork     = require('child_process').fork;
const fs       = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-training');


let User = mongoose.model('User', { name: String });


const utils = require('./utils');

let server = http.createServer();

server.on("request", (req, res) => {
    router(req.url, req.method)(req, res);
});

let router = (url, method) => {
    let routes = {
        POST: {
            "/prime_number": (req, res) => {
                utils.getRequestBody(req)
                    .then(interval => {
                        let worker = fork('./prime.js');

                        worker.on('exit', () => {
                            console.log('Worker killed!!!!!');
                        });

                        worker.on('message', result => {
                            res.end(JSON.stringify(result));
                        });

                        worker.send({min: parseInt(interval[0]), max: parseInt(interval[1])});
                    });
            },
            '/users': (req, res) => {

                let user = new User({ name: 'John' });
                user.save(function (err) {
                  if (err) {
                    return console.log(err);
                  }
                console.log('John was created!!!!');
                });

                res.end(JSON.stringify({res: 'John'}))
            }
        },
        GET: {
            "/": (req, res) => {
                fs.createReadStream('./public/index.html')
                    .pipe(res);
            },
            "/all_primes": (req, res) => {
                res.end(JSON.stringify({error: 'Not implemented'}));
            },
            '/users': (req, res) => {

                User.find((err, users) => {
                  if (err) return console.error(err);
                  res.end(JSON.stringify(users))
                })

            }
        },
        "default": (req, res) => {
            res.statusCode = 404;
            res.end(JSON.stringify({error: 'Route not found'}));
        }
    };
    return routes[method][url] || routes.default;
};

server.listen(3000, () => {
    console.log("Started");
});
