export default class Task {
    constructor({_id = Date.now().toString(), _rev, due = Date.now() + 50000, text = "text", xp = 70} = {}) {
        this._id = _id;
        this._rev = _rev;
        this.type = 'task';
        this.created = new Date();
        this.due = new Date(2017, 0, 7);
        this.text = text;
        this.xp = xp; // fibonacci 1, 2, 3, 5, 8, 13
        this.daysAlive = this.calcMilliSecondsToDay();
    }

    getTimeSpan(done = this.due.getTime()) {
        console.log("done" + done);
        console.log("crea" + this.created.getTime());
        return done - this.created.getTime();
    }

    calcMilliSecondsToDay() {
        let day = 24 * 60 * 60 * 1000; // hrs, minuts, secs, milisecs

        let date1_ms = this.created.getTime();
        let date2_ms = this.due.getTime();

        let difference_ms = date2_ms - date1_ms;

        return Math.ceil(difference_ms / day);
    }

    calcXpGain() {
        let elapsedTime = this.getTimeSpan(new Date().getTime());
        let originalTimeSpan = this.getTimeSpan();
        let timeBonus = (originalTimeSpan / elapsedTime);

        return Math.round(timeBonus); // possible: add random factor
    }
};