// var http = require('http');
// var fs = require('fs');

// var constants = {
//     PORT: 1800
// }

// http.createServer(function(req, res) {
//     if (req.url === '/favicon.ico') {
//         res.writeHead(200, { 'Content-Type': 'image/jpg' });
//         fs.createReadStream(__dirname + '/riverscuomo-mustache_400x400.jpg').pipe(res)
//     } else if (req.url === '/') {
//         res.writeHead(200, { 'Content-Type': 'text/json' });
//         var obj = {
//             firstName: 'Blake',
//             lastName: 'Boss'
//         }
//         res.end(JSON.stringify(obj));
//     } else {
//         res.writeHead(404);
//         res.end();
//     }
//     // fs.createReadStream(__dirname + '/hello.html').pipe(res);
// }).listen(constants.PORT, '127.0.0.1', function() {
//     console.log('Listening on port ' + constants.PORT);
// });

//EXPRESS

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/assets', express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    console.log(req.path);
    next();
});

app.get('/', function(req, res) {
    res.send('<html><head><link href="assets/main.css" type="text/css" rel="stylesheet" /></head><body><h2>HelloWorld</h2></body></html>');
});

app.get('/person/:id', function(req, res) {
    res.send('<html><head></head><body><h2>Person: ' + req.params.id + '</h2></body></html>');
});

app.get('/api', function(req, res) {
    res.json({
        first: 'Blake',
        last: 'Boss'
    });
});

app.listen(app.get('port'));