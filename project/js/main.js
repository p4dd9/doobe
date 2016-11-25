$(document).ready(function () {

    var $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }
});
