function homePath(req, res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(
        `Hola estas en el backend home\n
        Introduce: reduction the resources when you upgrade a build or resource.
        `

    );
}
module.exports = homePath;