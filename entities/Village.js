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
            this.resouceAmount;
            this.resourcePerHour;
            this.calculateResourceAmount();
            this.calculateResourcePerHour();
        }

        changeName(name){
            log.villageNameChanged(this.name, name)
            this.name = name;
        }
        calculateResourceAmount(){

        }
        calculateResourcePerHour(){

        }
        updateResourceAmount(){

        }
        updateResourcePerHour(){
            
        }

        toJSON() {
            return {
                Id: this.Id,
                name: this.name,
                field: this.field.toJSON()
            }
        }
    }
    module.exports = Village;