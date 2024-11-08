const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'))
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));

const log = new Logger();

class Resource {
    constructor(
        field, 
        Id = null, 
        type = 'new Resource', 
        level = process.env.RESOURCE_INIT_LEVEL, 
        locked = true, 
        maxLevel = process.env.RESOURCE_MAX_LEVEL, 
        amountPerHour = process.env.RESOURCE_AMOUNT_PER_HOUR, 
        productionGrowth = process.env.RESOURCE_PRODUCTION_GROW_PER_LEVEL){
            
        this.field = field;
        Id == null ? this.Id = getUUID() : this.Id = Id;
        this.type= type;
        this.level = level;
        this.maxLevel = maxLevel;
        this.amountPerHour = amountPerHour;
        this.productionGrowth = productionGrowth;
    }
    
    upgrade() {
        if(this.level < this.maxLevel){
           this.level = parseInt(this.level) + 1; 
            this.amountPerHour *= this.productionGrowth;

            log.resourceUpdated(this.field.village.name, this.Id, this.level)
            return {status: true, message: `upgraded to level: ${this.level}`};
        }
        else {
            log.maxLevelReached(this.field.village.Id, this.Id, this.name);
            return {status: false, message: `level: ${this.level}, max level reached`};
        }
    }

    toJSON() {
        return {
            Id: this.Id,  
            type: this.type,  
            level: this.level,  
            locked: this.locked, 
            maxLevel: this.maxLevel, 
            amountPerHour: this.amountPerHour,
            productionGrowth: this.productionGrowth 
        };
    }
}
module.exports = Resource;

