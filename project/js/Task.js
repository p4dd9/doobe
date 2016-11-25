export default class Task {
    constructor(dueDate) {
        this.startDate = Date.now();
        this.dueDate = dueDate;
    }

    getTimeSpan() {
        console.log(this.dueDate);
        console.log(this.startDate);

        return this.dueDate - this.startDate;
    }
}