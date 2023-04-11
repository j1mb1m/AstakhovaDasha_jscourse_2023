"use strict";
 
function HashStorageFunc(){
    let self = this;
    let data = {};
    
    self.addValue = function(key, value) {
        data[key] = value;
    }

    self.getValue = function(key){
        return data[key];
    }

    self.deleteValue = function(key){
        if (key in data) {
            delete data[key];
            return true; 
        }
        return false;
    }

    self.getKeys = function(){
        return Object.keys(this.data);
    }

}