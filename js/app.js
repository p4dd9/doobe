import User from './User'
import Rank from './Rank'
import $ from 'jquery'

$(document).ready(function () {

    let $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }
});

let lists = document.getElementsByClassName('task');
let green = 1;
for (let i = 0; i < lists.length; i++) {

    lists[i].style.backgroundColor = 'rgba(0,90,100,' + green + ')';

    green -= (1 / lists.length);
}

let myuser = new User();
let rank = new Rank();
let i = 2;