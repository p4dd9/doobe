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

    lists[i].style.backgroundColor = 'rgba(0,90,100,' + g + ')';

    g -= 1 / lists.length;
}

//# sourceMappingURL=main-compiled.js.map