'use strict';
const express           = require('express');
const fs                = require('fs');
const path              = require('path');

const app = express();
const www = path.resolve(__dirname, 'www');

app.get('*', function(req, res) {
    const url = req.url.split('?')[0];
    if (!path.extname(url)) {
        res.sendFile(www + '/index.html');
    } else {
        fs.stat(www + url, function(err, stats) {
            if (err || !stats.isFile()) {
                res.status(404).send('Not found');
            } else {
                res.sendFile(www + url);
            }
        });
    }
});

app.listen(8080, function(err) {
    if (err) return console.error(err.stack);
    console.log('Listening on port: 8080');
});