'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rank = require('./Rank.js');

var _Rank2 = _interopRequireDefault(_Rank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
    function Task() {
        var dueDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
        var rank = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Rank2.default();

        _classCallCheck(this, Task);

        this.startDate = dueDate;
        this.dueDate = dueDate;
        this.rank = rank;
    }

    _createClass(Task, [{
        key: 'getTimeSpan',
        value: function getTimeSpan() {
            console.log(this.dueDate);
            console.log(this.startDate);

            return this.dueDate - this.startDate;
        }
    }, {
        key: 'setRankName',
        value: function setRank(rank) {
            this.rank = rank;
        }
    }]);

    return Task;
}();

exports.default = Task;

//# sourceMappingURL=Task-compiled.js.map