"use strict";
 
function HashStorageFunc(){
    var self = this;
    var data = {};
    
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
        return undefined;
    }

    self.getKeys = function(){
        var keys = [];
        for (var key in data){
            keys[keys.length] = key; 
        }
        return keys;
    }

}