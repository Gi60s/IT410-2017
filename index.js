#! /usr/bin/env node
'use strict';
const express           = require('express');
const fs                = require('fs');
const grader            = require('it410-grader');
const path              = require('path');

const app = express();
const www = path.resolve(__dirname, 'www');
const start = Date.now();

app.get('/api/status', function(req, res) {
    res.send('Uptime: ' + Math.round((Date.now() - start) / 1000) + ' seconds');
});

app.get('/api/grade/:assignmentId/:ghUser/:ghRepository/:date?', function(req, res) {
    const p = req.params;
    if (!p.date) {
        const dt = new Date();
        var m = dt.getDate() + 1;
        if (m < 10) m += '0' + m;
        var d = dt.getDate();
        if (d < 10) d += '0' + d;
        p.date = dt.getFullYear() + '-' + m + '-' + d;
    }
    grader(p.assignmentId, 'https://github.com/' + p.ghUser + '/' + p.ghRepository + '.git', p.date)
        .then(function(data) {
            let result = '';

            const index = data.indexOf('Running tests.');
            data = data.substr(index);

            const lines = data.split('\n');
            const lastLine = lines[lines.length - 2];
            const score = /score: (\d+)/.exec(lastLine);
            const percent = /percent: ([\d\.]+)/.exec(lastLine);
            if (score && percent) {
                result += '<h2>Summary</h2>';
                result += '<p><strong>Percentage:</strong> ' + Math.round(100 * parseFloat(percent[1])) + '%</p>';
                result += '<p><strong>Points:</strong> ' + score[1] + '/25</p>';
            }

            result += '<h2>Details</h2>';
            result += '<pre>' + lines.slice(0, lines.length - 2).join('\n') + '</pre>';

            res.set('Content-Type', 'text/html');
            res.send('<html><body style="font-size: 18px; font-family: sans-serif;">' + result + '</body></html>');
        })
        .catch(function(err) {
            res.status(500);
            console.log(err.stack);
            res.send('Internal Server Error');
        })
});

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

app.listen(80, function(err) {
    if (err) return console.error(err.stack);
    console.log('Listening on port: 80');
});