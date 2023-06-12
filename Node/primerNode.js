var http = require("http");

http.createServer(function(request, answer){
    answer.writeHead(200, {"Content-Type": "text/plain"});
    answer.end(`
    Hola
    otra vez`);
}).listen(8080);