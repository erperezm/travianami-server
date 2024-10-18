const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'));
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));
const Field = require(path.join(__dirname, 'Field.js'))

const log = new Logger();

class Village {

    constructor(Id = null, name = 'New Village') {
        this.Id = Id || getUUID();
        this.name = name;
        this.field = new Field(this);
        this.resourceAmount;
        this.calculateResourceAmount(this.field);
        log.villageCreated(this);
    }

    changeName(name) {
        log.villageNameChanged(this.name, name)
        this.name = name;
    }
    calculateResourceAmount(field) {
        const result = {};

        field.resources.forEach(resource => {
            const { type, amountPerHour } = resource;
            const amount = parseFloat(amountPerHour);
    
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

        this.resourceAmount = result;
    }
    calculateResourcePerHour() {

    }
    updateResourceAmount() {
      
    }
    updateResourcePerHour() {

    }

    toJSON() {
        return {
            Id: this.Id,
            name: this.name,
            field: this.field.toJSON(),
            totalAmount: this.totalAmount
        }
    }
}
module.exports = Village;