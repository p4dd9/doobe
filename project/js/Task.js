export default class Task {
    constructor(dueDate = Date.now(), taskText = "taskText", workload = 100) {
        this._id = this.generateID();
        this.createdDate = Date.now();
        this.dueDate = dueDate;
        this.taskText = taskText;
        this.workload = workload; // fibonacci 1, 2, 3, 5, 8, 13
    }

    getTimeSpan(dueDate = this.dueDate) {
        return dueDate - this.createdDate;
    }

    generateID() {
        /*let numPattern = /[0-9]/g;
        return parseInt((numPattern.exec(new Date().toISOString())), 10);*/

        return Date.now();
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