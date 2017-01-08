export default class Task {
    constructor({_id = Date.now().toString(), _rev, name, created = Date.now(), due, workload, randomFactor, lectureId = "general", lectureName = "General"} = {}) {
        // Database fields
        this._id = _id;
        this._rev = _rev;
        this.name = name;
        this.created = created;
        this.due = due;
        this.workload = workload;
        this.randomFactor = randomFactor;
        this.lectureId = lectureId;
        // Calculated members, these won't be stored in the database
        this.lectureName = lectureName;
        this.xp = this.getXp();
        this.remainingDays = this.getRemainingDays();
    }

    toDocument() {
        return {
            _id: this._id,
            _rev: this._rev,
            name: this.name,
            created: this.created,
            due: this.due,
            workload: this.workload,
            randomFactor: this.randomFactor,
            lectureId: this.lectureId,
            type: "task"
        }
    }

    getRemainingDays() {
        // hrs, minutes, secs, milisecs
        let day = 24 * 60 * 60 * 1000;
        let days = Math.round(this.getTimeSpan() / day);
        if (days < 0)  return 0;
        else return days;
    }

    getTimeSpan(due = this.due) {
        // console.log("Created Date:" + this.created.toString());
        // console.log("Created Date Secs:" + this.created.getTime());
        // console.log("Current Date:" + new Date().toString());
        // console.log("Current Date Secs:" + new Date().getTime());

        return due - this.created;
    }

    getXp() {
        // HINT: xp based on miliseconds is baaaad ...
        // let elapsedTime = this.getTimeSpan(new Date());
        // let originalTimeSpan = this.getTimeSpan();
        // let totalXp = ((originalTimeSpan / elapsedTime) / this.getRemainingDays() / 1000) * 10 + this.getRemainingDays() * Math.PI * 5;
        // return Math.ceil(totalXp);

        return Math.ceil(this.getRemainingDays() * this.workload); // + this.randomFactor --> recalculcated when editing/saving
    }
};