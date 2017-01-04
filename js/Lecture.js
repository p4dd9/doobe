export default class Lecture {
    constructor({_id = Date.now().toString(), _rev, name} = {}) {
        this._id = _id;
        this._rev = _rev;
        this.type = 'lecture';
        this.name = name;
    }
};