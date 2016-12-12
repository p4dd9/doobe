"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
    function Task() {
        var dueDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
        var taskText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "taskText";
        var workload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

        _classCallCheck(this, Task);

        this._id = this.generateID();
        this.createdDate = Date.now();
        this.dueDate = dueDate;
        this.taskText = taskText;
        this.workload = workload; // fibonacci 1, 2, 3, 5, 8, 13
    }

    _createClass(Task, [{
        key: "getTimeSpan",
        value: function getTimeSpan() {
            var dueDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dueDate;

            return dueDate - this.createdDate;
        }
    }, {
        key: "generateID",
        value: function generateID() {
            /*let numPattern = /[0-9]/g;
            return parseInt((numPattern.exec(new Date().toISOString())), 10);*/

            return Date.now();
        }

        /***
         * calculates the amout of xp depending on the amount of workload
         * and when the task has been finish (the earlier, the better)
         * @returns {number}
         */

    }, {
        key: "calcXpGain",
        value: function calcXpGain() {
            var elapsedTime = this.getTimeSpan(Date.now());
            var originalTimeSpan = this.getTimeSpan();
            var timeBonus = originalTimeSpan / elapsedTime;

            return timeBonus * this.workload; // possible: add random factor
        }
    }]);

    return Task;
}();

exports.default = Task;
;

//# sourceMappingURL=Task-compiled.js.map