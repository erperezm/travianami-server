const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'))
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));

const log = new Logger();

class Resource {
    constructor(
        fild, Id = null, 
        type = 'new Resource', 
        level = process.env.RESOURCE_INIT_LEVEL, 
        locked = true, 
        maxLevel = process.env.RESOURCE_MAX_LEVE, 
        amountPerHour = process.env.RESOURCE_AMOUNT_PER_HOUR, 
        productionGrowth = process.env.RESOURCE_PRODUCTION_GROW_PER_LEVEL){
            
        this.fild = fild;
        Id == null ? this.Id = getUUID() : this.Id = Id;
        this.type= type;
        this.level = level;
        this.locked = locked;
        this.maxLevel = maxLevel;
        this.amountPerHour = amountPerHour;
        this.productionGrowth = productionGrowth;
    }
    
    upgradeResource() {
        if(this.level < this.maxLevel && this.locked == false){
            this.level += 1; 
            this.amountPerHour *= this.productionGrowth;
            this.lockNextLevel();

            log.resourceUpdated(this.fild.village.name, this.Id, this.level)
        }
        else if (this.level = this.maxLevel){
            log.maxLevelReached(this.fild.village.Id, this.Id, this.name);
        }else{
            log.unknownError(this.fild.village.Id, `error trying to upgrade resource: ${this.name} with Id: ${this.Id}`);
        }
    }

    lockNextLevel(){
        this.locked = true;
    }
    unlockNextLevel(){
        this.locked = false;
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

