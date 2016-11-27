'use strict';

var _Task = require('../js/Task.js');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('task-test', function () {
    var task = new _Task2.default();
    it('time between same day', function () {
        task.getTimeSpan().should.eql(0);
    });

    it('default name should be example-name', function () {
        task.rank.name.should.eql('example-name');
    });
});

//# sourceMappingURL=test-compiled.js.map