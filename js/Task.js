export default class Task {
    constructor({due = Date.now(), text = "text", workload = 100} = {}) {
        this._id = this.generateID();
        this.type = 'task';
        this.created = Date.now();
        this.due = due;
        this.text = text;
        this.workload = workload; // fibonacci 1, 2, 3, 5, 8, 13
    }

    getTimeSpan(done = this.due) {
        return done - this.created;
    }

    generateID() {
        /*let numPattern = /[0-9]/g;
         return parseInt((numPattern.exec(new Date().toISOString())), 10);*/

        return Date.now().toString();
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