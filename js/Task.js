export default class Task {
    constructor({_id = Date.now().toString(), _rev, created = Date.now(), due = Date.now() + 5000, text = "text", xp = 70} = {}) {
        this._id = _id;
        this._rev = _rev;
        this.type = 'task';
        this.created = created;
        this.due = due;
        this.text = text;
        this.xp = xp; // fibonacci 1, 2, 3, 5, 8, 13
    }

    getTimeSpan(done = this.due) {
        return done - this.created;
    }

    calcXpGain() {
        let elapsedTime = this.getTimeSpan(Date.now());
        let originalTimeSpan = this.getTimeSpan();
        let timeBonus = (originalTimeSpan / elapsedTime);

        return Math.round(timeBonus * this.xp); // possible: add random factor
    }
};