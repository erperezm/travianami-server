const path = require('path');
const { pathSelector } = require(path.join(__dirname, 'MinimalEx.js'));


function villagePath(req, res){
    //let params = null;
    routes = [
        { method: 'GET', path: '/village', handler: getVillages },
        { method: 'GET', path: '/village/:id',  handler: getVillage },  
        { method: 'GET', path: '/village/id/:id/name/:name', handler: getVillage },      
    ]
    pathSelector(req, res, routes);
}

function getVillages(res, params){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(process.env.GAME_GRID)
}


function getVillage(res, params){
    const villages = JSON.parse(process.env.GAME_GRID);
    const village = villages.find(a => a.Id == params.id)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(village))
}
module.exports = villagePath;