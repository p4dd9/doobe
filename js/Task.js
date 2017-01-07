export default class Task {
    constructor({_id = Date.now().toString(),_rev, created = new Date(), daysToAdd = 5, text = "text"} = {}, lecture = "Mathematics") {
        this._id = _id;
        this._rev = _rev;
        this.type = 'task';
        this.created = created;
        this.due = this.setDueDate(new Date(), daysToAdd);
        this.text = text;
        this.remainingDays = this.getRemainingDays();
        this.xp = this.getXp();
        this.lecture = lecture.toString();
    }

    setDueDate(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    getRemainingDays() {
        let day = 24 * 60 * 60 * 1000; // hrs, minuts, secs, milisecs

        let createdInMs = this.created.getTime();
        let dueDateInMs = this.due.getTime();

        let differenceMs = dueDateInMs - createdInMs;

        return Math.ceil(differenceMs / day);
    }

    getOriginalTimeSpan() {
        return this.due.getTime() - this.created.getTime();
    }

    getElapsedTime() {
        // console.log("Created Date:" + this.created.toString());
        // console.log("Created Date Secs:" + this.created.getTime());
        // console.log("Current Date:" + new Date().toString());
        // console.log("Current Date Secs:" + new Date().getTime());

        return Date.now() - this.created.getTime();
    }

    getXp() {
        let elapsedTime = this.getElapsedTime();
        let originalTimeSpan = this.getOriginalTimeSpan();
        let totalXp = ((originalTimeSpan / elapsedTime) / this.getRemainingDays() / 1000) * 10 + this.getRemainingDays() * Math.PI * 5;

        // return Math.ceil(totalXp); // possible: add random factor
        let random = Math.floor(Math.random() * 5) + 1;
        return this.getRemainingDays() * random;
    }
};