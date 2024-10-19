const path = require('path');
const loadEnv = require(path.join(__dirname, 'utils', 'EnvReader'));
const initHttpServer = require(path.join(__dirname, 'server', 'HttpServer.js'));

initGameObjects();
initHttpServer();

function initGameObjects() {
    const Village = require(path.join(__dirname, 'entities','Village.js'))
    const GAME_GRID = [];

    loadEnv(".env")
    loadEnv('Game.env')

    for (let gridWith = 0; gridWith < process.env.GAME_GRID_WIDTH ; gridWith++) {
        for (let gridHeight = 0; gridHeight < process.env.GAME_GRID_HEIGHT ; gridHeight++) {
            const village = new  Village(null, `village:${gridWith}${gridHeight}`);
            GAME_GRID.push(village);
        }
    }
    process.env.GAME_GRID = JSON.stringify(GAME_GRID);

}


