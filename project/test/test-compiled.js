'use strict';

var _Task = require('../js/Task.js');

var _Task2 = _interopRequireDefault(_Task);

var _Rank = require('../js/Rank');

var _Rank2 = _interopRequireDefault(_Rank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('task-test', function () {
    var task = new _Task2.default();
    var rank1 = new _Rank2.default();

    it('time between same day', function () {
        task.getTimeSpan().should.eql(0);
    });

    var rank2 = new _Rank2.default();

    console.log(rank1.time);
    console.log(rank2.time);
});

//# sourceMappingURL=test-compiled.js.map