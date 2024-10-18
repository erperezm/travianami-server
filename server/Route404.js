function get404(res, from){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({hola:`Sorry man you get a 404 I can't find them  😿 from: ${from}`}))
}
module.exports = get404;
