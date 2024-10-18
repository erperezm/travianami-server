const path = require('path');
const Logger = require(path.join(__dirname, '..', 'utils', 'Logger.js'));
const getUUID = require(path.join(__dirname, '..', 'utils', 'Uuid.js'));

class Building {
    constructor(settlement, Id = null,  name = "New Building", level = 0, locked = true, maxLevel = 10) {
      this.settlement = settlement;
      this.Id = Id || getUUID();
      this.name = name;        
      this.level = level;      
      this.locked = locked;
      this.maxLevel = maxLevel;
    }
  
    upgrade() {
        if(this.level < this.maxLevel && this.locked == false){
            this.level += 1; 
            this.lockNextLevel();

            log.buildingUpdated(this.name, this.fild.village.name, this.level)
        }
        else if (this.level = this.maxLevel){
            log.maxLevelReached(this.fild.village.Id, this.Id, this.name);
        }else{
            log.unknownError(this.fild.village.Id, `error trying to upgrade building: ${this.name} with Id: ${this.Id}`);
        }
    }

    lockNextLevel(){
        this.locked = true;
    }

    unlockNextLevel(){
        this.locked = false;
    }

  }
module.exports = Building;
  