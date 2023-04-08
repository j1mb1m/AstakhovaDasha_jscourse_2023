"use strict";
 
class HashStorageClass {

    constructor(){
        this.data = {};
    }
     
    addValue(key, value) {
        this.data[key] = value;
    }

    getValue(key){
        return this.data[key];
    }

    deleteValue(key){
        if (key in this.data) {
            delete this.data[key];
            return true; 
        }
        return false;
    }

    getKeys(){
        var keys = [];
        for (var key in this.data){
            keys[keys.length] = key; 
        }
        return keys;
    }

}