const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'));
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));

const Resource = require(path.join(__dirname, 'Resource.js'));
const Settlement = require(path.join(__dirname, 'Settlement.js'));

const log = new Logger();

class Field {

    constructor(village, Id = null, resources = null, settlement = null) {
        this.village = village;
        this.Id = Id || getUUID();
        this.resources = [];
        resources == null ? this.#generateResourcesWithChance(): this.resources = resources;
        settlement == null ? this.#generateSettlement() : this.settlement = settlement;
    }

    toJSON() {
        return {
            Id: this.Id,
            resources: this.resources.map(resource => resource.toJSON()),
            settlement: this.settlement ? this.settlement.toJSON() : null
        };
    }

    getResourceIndex(id){
        const index = this.resources.findIndex(a => a.Id == id)

        return index;
    }

    #generateResourcesWithChance() {
        const RESOURCE_PER_FIELD = process.env.RESOURCE_PER_FIELD;
        const RESOURCE_TYPES = JSON.parse(process.env.RESOURCE_TYPES);

        let lowLimits = this.#getLowLimits(RESOURCE_TYPES);
        if (this.#persentageChecked(RESOURCE_TYPES)) {
            for (let resourceFild = 0; resourceFild < RESOURCE_PER_FIELD; resourceFild++) {

                let chance = this.#getChance();
                for (let rec = 0; rec < RESOURCE_TYPES.length; rec++) {
                    if (chance >= lowLimits[rec] && chance < lowLimits[rec + 1]) {
                        const s = new Resource(this);
                        s.Id = getUUID();
                        s.type = RESOURCE_TYPES[rec].type
                        this.resources.push(s);
                        break;
                    }
                }
            }
            
        } else {
            throw new Error("All resources need to be 100%");//TODO

        }
        log.fieldResourcesCreated(this.resources, this.village.name);
        //this.sumarRecursos(this.village)
    }

    #generateSettlement() {
        const settlement = new Settlement(this);
    }

    #getLowLimits(arr) {
        arr = this.#sortArrayHighestLowest(arr);

        let cumulativeArray = [0];
        let sum = 0;

        arr.forEach(item => {
            sum += item.chance;
            cumulativeArray.push(sum);
        });

        return cumulativeArray;
    }

    #persentageChecked(arr) {
        const total = arr.reduce((sum, item) => sum + item.chance, 0);
        return total == 100 ? true : false;
    }

    #sortArrayHighestLowest(arr) {
        return arr.sort((a, b) => b.chance - a.chance);
    }
    #getChance() {
        return Math.random() * 100;
    }
}
module.exports = Field;
