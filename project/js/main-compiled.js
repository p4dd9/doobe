'use strict';

$(document).ready(function () {

    var $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }
});

lists = document.getElementsByClassName('task');
var g = 1;
for (var i = 0; i < lists.length; i++) {

    lists[i].style.backgroundColor = 'rgba(0,0,0,' + g + ')';

    g -= 0.1;
}

//# sourceMappingURL=main-compiled.js.map