import Task from '../js/Task.js'
import Rank from '../js/Rank'

describe('task-test', () => {
    let task = new Task();
    let rank1 = new Rank();

    it('time between same day', () => {
        task.getTimeSpan().should.eql(0);
    });

    let rank2 = new Rank();
    rank1.level = 2;
    rank2.xp = 200;

    it('test Rank-Singleton on level', () => {
        return rank1.level === rank2.level
    });

    it('test Rank-Singleton on time', () => {
        return rank1.time === rank2.time
    });

    it('test Rank-Singleton on xp', () => {
        return rank1.xp === rank2.xp
    });
});