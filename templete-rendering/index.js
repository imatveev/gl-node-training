"use strict";

const fs = require('fs');
const json = require('./data');


doCoolThings();

function doCoolThings() {
    fs.readFile('./node.html', 'utf-8', (err, tpl) => {
        let rendered = render(tpl, json);

        fs.writeFile('./rendered.html', rendered, err => {
            console.log(err ? err : 'Render completed');
        })
    });
}

function render(tpl, data) {
    return tpl.replace(/{{(\s*[\w.]+\s*)}}/g, (str, key) => get(data, key, key));
}

// Alternative to lodash get method _.get()
// https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf
function get(obj, path, fallback) {
    let fullPath = path
        .replace(/\[/g, '.')
        .replace(/]/g, '')
        .split('.')
        .filter(Boolean);

    return fullPath.every(everyFunc) ? obj : fallback;

    function everyFunc(step) {
        return !(step && (obj = obj[step]) === undefined);
    }
}