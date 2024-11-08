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
    constructor(
        field, Id = getUUID(), 
        population = process.env.SETTLEMENT_PEOPLE_AMOUNT, 
        buildings = this.#setBuildings(), 
        troop = null
    ) {
        this.field = field;
        this.Id = Id;
        this.population = population;
        this.buildings = buildings;
    }

    getBuildingIndex(id){
        const index = buildings.find(a => a.Id == id)
        return index;
    }

    

    #setBuildings(){
        const buildingsNames = JSON.parse(process.env.BUILDINGS);
        let buildings = [];
        buildingsNames.forEach(name => {
            const newBuilding = new Building(this, name)
            buildings.push(newBuilding);
        })
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