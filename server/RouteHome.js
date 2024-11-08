function homePath(req, res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola estas en el backend home');
}
module.exports = homePath;