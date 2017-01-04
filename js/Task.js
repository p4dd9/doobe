export default class Task {
    constructor({_id = Date.now().toString(), _rev, created = Date.now(), due = Date.now(), text = "text", workload = 100} = {}) {
        this._id = _id;
        this._rev = _rev;
        this.type = 'task';
        this.created = created;
        this.due = due;
        this.text = text;
        this.workload = workload; // fibonacci 1, 2, 3, 5, 8, 13
    }

    getTimeSpan(done = this.due) {
        return done - this.created;
    }

    /***
     * calculates the amout of xp depending on the amount of workload
     * and when the task has been finish (the earlier, the better)
     * @returns {number}
     */
    calcXpGain() {
        let elapsedTime = this.getTimeSpan(Date.now());
        let originalTimeSpan = this.getTimeSpan();
        let timeBonus = (originalTimeSpan / elapsedTime);

        return timeBonus * this.workload; // possible: add random factor
    }
};