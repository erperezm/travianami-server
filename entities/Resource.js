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
        locked = false, 
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
    #canResourceUpdate(){
        if(this.level < this.maxLevel)
        {
            if(this.#enoughResourceAbailable())
            {
                return {status:true, message:`Resource ${this.Id} was updated to ${this.level} within the village ${this.field.village.name}`}
            }
            else {
               log.notEnoughResources(this.field.village.resourceAmount, this.field.village.Id, this.Id);
                return {status: false, message:`Resources: ${JSON.stringify(this.field.village.resourceAmount)}, no enough resources, within the village ${this.field.village.Id} in resource: ${this.Id}`};
            }
            
        }
        else {
            log.maxLevelReached(this.field.village.Id, this.Id, this.type);
            return {status:false, message:`Max level reach in the resource: ${this.type} with Id: ${this.Id} within the village: ${(this.field.village.Id)}`};
                
        }
    }

    #enoughResourceAbailable(discountObject= { food: 1500, metal: 1000, water: 1000, wood: 1000 }){
        let enough = true
        
        for (const key in this.field.village.resourceAmount) {
            if(this.field.village.resourceAmount[key] < discountObject[key]){
                enough = false
            }
        }
        return enough
    }    

    #decreseResourceByUpdate(discountObject= { food: 1500, metal: 1000, water: 1000, wood: 1000 }){
        if(this.#enoughResourceAbailable()){
            for (const key in this.field.village.resourceAmount) {
            this.field.village.resourceAmount[key] -= discountObject[key];
            }
        }
    }
    #updateLevel(){
        this.level = parseInt(this.level) + 1; 
        this.amountPerHour *= this.productionGrowth;
    }
    upgrade() {
        const canUpdate = this.#canResourceUpdate()
        if(canUpdate.status){
            this.#updateLevel();
            this.#decreseResourceByUpdate()
            log.resourceUpdated(this.field.village.name, this.Id, this.level)
        }
        return canUpdate;
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

