const path = require('path');
const { mainPathSelector } = require(path.join(__dirname, 'MinimalEx.js'));


function routesHandler(req, res){   
    const homePath = require(path.join(__dirname, 'RouteHome.js'));
    const villagePath = require(path.join(__dirname, 'RouteVillage.js'));

    console.log(req.url)

    const routes = [
        { method: 'GET', path: '/', handler: homePath }, 
        { method: 'GET', path: '/village', handler: villagePath },        
    ]   
    mainPathSelector(req, res, routes);

}
module.exports = routesHandler;