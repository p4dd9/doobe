import Task from '../js/Task.js'

describe('task-test', () => {
    it('time between same day', () => {
        let task = new Task(Date.now());
        task.getTimeSpan().should.eql(0)
    })
})