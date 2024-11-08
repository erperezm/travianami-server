const http = require('http');
const path = require('path');
const routesHandler = require(path.join(__dirname, 'RoutesHandler.js'));
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'))

const PORT = 3000;
const log = new Logger;


function initHttpServer(){
  const server = http.createServer((req, res) => {
    routesHandler(req, res);
  });
  
  server.listen(PORT, () => {
    log.serverListen(PORT);
  });
}
module.exports = initHttpServer;