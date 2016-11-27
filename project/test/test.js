import Task from '../js/Task.js'

describe('task-test', () => {
    let task = new Task();
    it('time between same day', () => {
        task.getTimeSpan().should.eql(0);
    });

    it('default name should be example-name', () => {
        task.rank.name.should.eql('example-name');
    });
});