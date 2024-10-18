const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'))
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));

const Building = require(path.join(__dirname, 'Building.js'))

class Settlement {
    /**
     * Represents a settlement that can manage buildings and troops.
     * @param {object} field - contains resources and the settlement.
     * @param {number} population - Current population of the settlement.
     * @param {Array} buildings - List of buildings constructed in the settlement.
     * @param {Array} troops - List of troops stationed at the settlement.
     */
    constructor(field, Id = null, population = 100, buildings = null, troop = null) {
        this.field = null;
       this.Id || getUUID();
        this.population = population;
        this.buildings ? this.buildings = buildings : this.setBuildings();
    }
    setBuildings(){
    }
    toJSON() {
        return {
            Id: this.Id,
            population: this.population,
            buildings: this.buildings || [],
        };
    }
    

}
module.exports = Settlement;