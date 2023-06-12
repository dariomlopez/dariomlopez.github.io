var http = require("http");  //require module "http"

http.createServer(function(request, answer){
    answer.writeHead(200, {"Content-Type": "text/html, charset=UTF-8"});
    answer.end(`<h1>
    Hola
    desde
    mi primer
    node
    js</h1>`);   //response to the client
}).listen(8080);