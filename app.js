'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

    var fileName = '';

    if (req.url === '/') {
        fileName = __dirname + '/web/index.html';
    } else {
        fileName = __dirname + '/web' + req.url;
    }

    fs.readFile(fileName, function (err, result) {
        if (err) {
            res.end();
            return;
        }

        res.write(result);
        res.end();
    });
});

server.listen(5555);

console.log('Server now listening at port 5555');