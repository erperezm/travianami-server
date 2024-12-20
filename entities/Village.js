const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'));
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));
const Field = require(path.join(__dirname, 'Field.js'))

const log = new Logger();

class Village {

    constructor(Id = null, name = 'New Village', field = null, resourceAmount = JSON.parse(process.env.RESOURCE_DEFAULT_AMOUNT), maxResourceAmount = JSON.parse(process.env.RESOURCE_DEFAULT_MAX_AMOUNT)) {
        this.Id = Id || getUUID();
        this.name = name;
        field == null ? this.field = new Field(this) : this.field = field;
        this.resourceAmount = resourceAmount;
        this.resourcePerHour;
        this.maxResourceAmount = maxResourceAmount;
        this.resourcesCuantityCalculated = null;
        this.#calculateResourcePerHour(this.field);
        setInterval(() => this.#updateResourceAmount(), process.env.UPDATE_INTERVAL);
        this.#countResources()
        log.villageCreated(this);

    }

    changeName(name) {
        this.name = name;
        log.villageNameChanged(this.name, name)
    }

    
    
    #countResources() {
        const resources = this.field.resources;
        const counts = { metal: 0, food: 0, water: 0, wood: 0 };
    
        resources.forEach(resource => {
            if (counts.hasOwnProperty(resource.type)) {
                counts[resource.type]++;
            }
        });
    
        this.resourcesCuantityCalculated = counts;
    }

    #calculateResourcePerHour(field) {
        const result = {};

        field.resources.forEach(resource => {
            const { type, amountPerHour } = resource;
            const amount = parseInt(amountPerHour);
    
            if (result[type]) {
                result[type] += amount;
            } else {
                result[type] = amount;
            }
        });
        let finalResult = {};
        Object.keys(result).forEach(type => {
            finalResult[`type:${type}`] = ", total:";
            finalResult[`totalAmount:`] = `, total:${result[type]}`;
        });

        this.resourcePerHour = result;
    }


    #updateResourceAmount() {
        Object.keys(this.resourcePerHour).forEach(type => {
            let amount =  parseFloat(this.resourceAmount[type]) + ((parseInt(this.resourcePerHour[type])/60))/60
            amount >= this.maxResourceAmount[type] ? this.resourceAmount[type] = this.maxResourceAmount[type]  : this.resourceAmount[type] = amount
        });
        this.#calculateResourcePerHour(this.field);
    }

    updateResourcePerHour() {

    }

    toJSON() {
        return {
            Id: this.Id,
            name: this.name,
            field: this.field.toJSON(),
            totalAmount: this.totalAmount,
            resourceAmount: this.resourceAmount,
            resourcePerHour: this.resourcePerHour,
            resourcesCuantity: this.resourcesCuantityCalculated,
            maxResourceAmount: this.maxResourceAmount

        }
    }
}
module.exports = Village;