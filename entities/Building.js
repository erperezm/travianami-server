const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'));
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));

class Building {
    constructor(
        settlement = null, 
        name = "New Building", 
        Id = getUUID(),  
        level = 0, 
        locked = true, 
        initLevel = process.env.BUILDING_INIT_LEVEL, 
        maxLevel = process.env.BUILDING_MAX_LEVEL, 
        bonus = null
    ) 
    {
      this.settlement = settlement;
      this.name = name;        
      this.Id = Id;
      this.level = level;      
      this.locked = locked;
      this.initLevel = initLevel;
      this.maxLevel = maxLevel;
      this.bonus = bonus;
    }
  
    upgrade() {
        if(this.level < this.maxLevel && this.locked == false){
            this.level += 1; 
            this.#lockNextLevel();

            log.buildingUpdated(this.name, this.fild.village.name, this.level)
        }
        else if (this.level = this.maxLevel){
            log.maxLevelReached(this.fild.village.Id, this.Id, this.name);
        }else{
            log.unknownError(this.fild.village.Id, `error trying to upgrade building: ${this.name} with Id: ${this.Id}`);
        }
    }

    #lockNextLevel(){
        this.locked = true;
    }

    #unlockNextLevel(){
        this.locked = false;
    }

  }
module.exports = Building;
  