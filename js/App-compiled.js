'use strict';

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {

    var $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }
});

var lists = document.getElementsByClassName('task');
var green = 1;
for (var i = 0; i < lists.length; i++) {

    lists[i].style.backgroundColor = 'rgba(0,90,100,' + green + ')';

    green -= 1 / lists.length;
}

var user = new _User2.default();

//# sourceMappingURL=App-compiled.js.map