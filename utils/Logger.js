const fs = require('fs');
const path = require('path');

FILE_NAME ="events.log";
DIR = ".";
const FILE_PATH = path.join(DIR, FILE_NAME);

/**
 * Creates a file and writes data to it if it doesn't already exist.
 * 
 * @param {string} content - The content to write to the file.
 */
class Logger{
    constructor (){
    }

    log(content) {
        content = this.addTime(content)
    
        // Create and write to the file
        fs.appendFile(FILE_PATH, content, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to file ${FILE_NAME}:`, err);
                return;
            }
            console.log(`\n${content}`);
        });
    }

    addTime(content){
        return `\n${Date()}: ${content}`
    }

     /**
     * Changes the name of the village and logs the change.
     * 
     * @param {string} oldName - The current name of the village.
     * @param {string} newName - The new name of the village.
     */
    villageNameChanged(oldName, newName){
        this.log(`Village name changed from ${oldName} to ${newName}`)
    }


    /**
     * Logs the resource level within the village.
     * 
     * @param {string} villageName - The name of the village where the resource is updated.
     * @param {string} resource - The type of resource being updated (e.g., 'wood', 'metal').
     * @param {number} newLevel - The new level of the resource.
     */
    resourceUpdated(villageName, resourceId, newLevel){
        this.log(`Resource ${resourceId} was updated to ${newLevel} within the village ${villageName}`)
    }

    /**
     * Logs the building level within the settlement.
     * 
     * @param {string} villageName - The name of the village where the building is updated.
     * @param {string} buildingName - The name of the building.
     * @param {number} newLevel - The new level of the building.
     */
        buildingUpdated(buildingName, villageName, newLevel){
            this.log(`Building ${buildingName} was updated to ${newLevel} within village: ${villageName}`)
        }

    /**
     * Generate resource filds
     * 
     * @param {string} resources - Array of resources.
     * @param {string} villageName - The name of the village where the resource is updated.
     */
    fieldResourcesCreated(resources, villageName){
        resources.forEach(resource => {
            this.log(`Village: ${villageName} created with the following resouruce: ${resource.Id}, Name: ${resource.type}, Level: ${resource.level}, Quantity per Hour: ${resource.amountPerHour}`);
        });
    }

    /**
     * Logs a message when the maximum level is reached for a specific resource.
     * @param {string} villageId - The unique identifier of the village.
     * @param {string} Id - The unique identifier of the resource.
     * @param {string} name - The name of the resource.
     */
    maxLevelReached(villageId, Id, name){
        this.log(`Max level reach in the resource: ${name} with Id: ${Id} within the village: ${villageId}`);
    }


    /**
     * Logs an unknown error message for a specific village.
     * @param {string} villageId - The unique identifier of the village.
     * @param {string} customMessage - A custom message providing details about what you trying to do.
     */
    unknownError(villageId, customMessage){
        this.log(`unknown error within the village: ${villageId} Details: ${customMessage}`);
    }

    /**
     * Logs server start and listening port.
     * @param {Int} port - The port number where the server should listen.
     */
    serverListen(port){
        this.log(`Server running on http://localhost:${port}`);
    }
}
module.exports = Logger;

