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
        this.field = field;
        Id == null ? this.Id = getUUID() : this.Id = Id;
        this.population = population;
        buildings == null ? this.setBuildings() : this.buildings = buildings  ;
    }
    setBuildings(){
        const buildings = JSON.parse(process.env.BUILDINGS);
        this.buildings = [];
        buildings.forEach(building => {
            const newBuilding = new Building(this, building)
            this.buildings.push(newBuilding);
        })
     
        console.log("hola", this.buildings)
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