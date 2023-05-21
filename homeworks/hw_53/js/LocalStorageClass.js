export class LocalStorageClass {

    constructor(storageName) {
        this.storageName = storageName;

        if (localStorage[storageName]) {
            try {
                this.data = JSON.parse(localStorage[storageName]);
            }
            catch {
                this.data = {};
            }
        }
        else {
            this.data = {};
        }
    }

    addValue(key, value) {
        this.data[key] = value;
        localStorage[this.storageName] = JSON.stringify(this.data);
    }

    getValue(key) {
        return this.data[key];
    }

    deleteValue(key) {
        if (key in this.data) {
            delete this.data[key];
            localStorage[this.storageName] = JSON.stringify(this.data);
            return true;
        }
        return false;
    }

    getKeys() {
        return Object.keys(this.data);
    }

}