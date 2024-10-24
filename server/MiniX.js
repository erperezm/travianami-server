
/**
 * 
 * @param {*} url 
 * @param {*} path 
 * @returns 
 */
function getParams(url, path) {
  const params = {};
  
  const urlParts = url.split('/');
  const pathParts = path.split('/');

  pathParts.forEach((part, index) => {
      if (part.startsWith(':')) {
          const key = part.substring(1); 
          params[key] = urlParts[index];    
      }
  });

  return params;
}

/**
 * 
 * @param {*} req 
 * @param {*} routes 
 * @returns 
 */
function getRouteMatch(req, routes){
  for (let i = 0; i < routes.length; i++) {
    if(req.url.match(getRegex(routes[i].path))){
        return i;
      } 
  }
  return 404;
} 


/**
 * 
 * @param {*} req 
 * @param {*} routes 
 */
function getMainPath(req, routes){
  for (let i = 0; i < routes.length; i++) {
    if(`/${req.url.split('/')[1]}`== routes[i].path){
        return i;
      } 
  }
  return 404;
}

/**
 * 
 * @param {*} str 
 * @returns 
 */
function getRegex(str) {

  const regexString = str
    .replace(/\//g, '\\/')
    .replace(/:([^\/]+)/g, '([^\\/]+)');
  
  return new RegExp(`^${regexString}$`);
}

/**
 * 
 * @param {*} req 
 * @param {*} routes 
 */
function pathSelector(req, res, routes){
  const path = require('path');
  const error404 = require(path.join(__dirname, 'Route404.js'));
  
  const index = getRouteMatch(req, routes);

  if(index == 404){
      error404(res, "village")
  }
  else{
      params = getParams(req.url, routes[index].path); 
      routes[index].handler(res, params);
  }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} routes 
 */
function mainPathSelector(req, res, routes){
  const path = require('path');
  const error404 = require(path.join(__dirname, 'Route404.js'));

        const index =  getMainPath(req, routes)
        if(index == 404){
            error404(res, "main path selector");
        }else{
            routes[index].handler(req, res);
        }
}

module.exports = { getParams, getRouteMatch, getMainPath, pathSelector, mainPathSelector };