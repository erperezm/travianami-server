const path = require('path');
const { pathSelector } = require(path.join(__dirname, 'MiniX.js'));

function villagePath(req, res){
    routes = [
        { method: 'GET', path: '/village', handler: getVillages },
        { method: 'GET', path: '/village/:id',  handler: getVillage },  
        { method: 'GET', path: '/village/:id/upgrade/resource/:resourceId',  handler: upgradeResource },  
        { method: 'GET', path: '/village/:id/upgrade/building/:buildingId',  handler: upgradeBuilding },  
    ]
    pathSelector(req, res, routes);
}

function findVillage(res, params){
    const village = global.GAME_GRID.find(a => a.Id == params.id)
    if(village){
        return village;
    }
    else{
        httpResponse(res, {message:"sorry bro :\'( village not found"})
    }
}

function httpResponse(res, response){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(response))
}

function getVillages(res, params){
    httpResponse(res, global.GAME_GRID)
}


function getVillage(res, params){
    const village = findVillage(params);
    if(village){

        httpResponse(res, {village:village})
    }else{
        httpResponse(res, {message:'sorry bro :\'( no village found'})
    }
}

function upgradeResource(res, params){
    const village = findVillage(res, params);
    if(village)
    {
        const resourceIndex = village.field.getResourceIndex(params.resourceId);
        if(resourceIndex == -1)
        {
            httpResponse(res, {message: "sorry bro :\'( resource not found"})
        }else{
            const response = village.field.resources[resourceIndex].upgrade();
            httpResponse(res, response)
        }
    }


    
}

function upgradeBuilding(res, params){
    const village = findVillage(res, params);
    buildingIndex = village.field.settlement.getBuildingIndex(params.buildingId);
    const response = village.field.settlement.buildings[resourceIndex].ugrade();

    httpResponse(res, response);
}
module.exports = villagePath;