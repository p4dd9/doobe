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

    lists[i].style.backgroundColor = 'rgba(0,0,0,'+g+')';

    g-=0.1;
}