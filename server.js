var express = require('express')
,	server = express();

server.use(express.static(__dirname + '/src'));

server.listen(3000);
console.log("Server listening on port 3000");