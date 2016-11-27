import Rank from './Rank.js'

export default class Task {
    constructor(dueDate = Date.now(), rank = new Rank()) {
        this.startDate = dueDate;
        this.dueDate = dueDate;
        this.rank = rank;
    }

    getTimeSpan() {
        return this.dueDate - this.startDate;
    }

    setRank(rank) {
        this.rank = rank;
    }
}