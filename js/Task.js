export default class Task {
    constructor({_id = Date.now().toString(), _rev, daysToAdd = 5, text = "text", xp = 70} = {}) {
        this._id = _id;
        this._rev = _rev;
        this.type = 'task';
        this.created = new Date(); // gets overwritten somehow
        this.due = this.setDueDate(new Date(), 5);
        this.text = text;
        this.xp = this.getRemainingDays() * 42; // fibonacci 1, 2, 3, 5, 8, 13
        this.remainingDays = this.getRemainingDays();
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
        console.log("Current Date:" + new Date().toString());
        let createdDate = new Date(this.created.getTime());
        console.log("Created Date:" + createdDate.toString());

        console.log("Created Date Secs" + this.created.getTime().toString());
        //return 10;
        return  Date.now() - this.created.getTime();
    }

    getXp() {
        let elapsedTime = this.getElapsedTime();
        console.log(elapsedTime);
        let originalTimeSpan = this.getOriginalTimeSpan();
        let timeBonus = (originalTimeSpan / elapsedTime);

        // return Math.round(timeBonus * this.xp); // possible: add random factor
        return this.xp; // ToDo review time based xp system, created Date falsly overwritten in function
    }
};