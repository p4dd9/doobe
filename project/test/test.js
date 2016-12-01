import Task from '../js/Task.js'
import Rank from '../js/Rank'

describe('task-test', () => {
    let task = new Task();
    let rank1 = new Rank();

    it('time between same day', () => {
        task.getTimeSpan().should.eql(0);
    });

    let rank2 = new Rank();

    console.log(rank1.time);
    console.log(rank2.time);
});