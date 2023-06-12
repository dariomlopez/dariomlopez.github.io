var http = require("http");

http.createServer(function(request, answer){
    answer.writeHead(200, {"Content-Type": "text/plain"});
    answer.end(`
    Hola
    desde
    mi primer
    node
    js`);
}).listen(8080);