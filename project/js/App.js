$(document).ready(function () {

    let $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }
});

lists = document.getElementsByClassName('task');
let g=1;
for (let i = 0; i < lists.length;i++) {

    lists[i].style.backgroundColor = 'rgba(0,90,100,'+g+')';

    g-=(1/lists.length);
}