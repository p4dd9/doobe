$(document).ready(function () {

    let $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }
});
