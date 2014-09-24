var express = require('express')
,	server = express();

server.use(express.static(__dirname + '/src'));

server.listen(8000);
console.log("Server listening on port 8000");