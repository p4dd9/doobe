import User from './User'
import Rank from './Rank'
import Task from './Task'
import $ from 'jquery'
import page from 'page'
import index from './index'

$(document).ready(function () {

    let $task = $('.task');

    $task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }

    $('.control-bar__bar-holder').on('click', () => {
        let t = new Task();
        t.taskText = 'New task';
        myuser.addTask(t);
    });
});

let lists = document.getElementsByClassName('task');
let alpha = 1;
for (let i = 0; i < lists.length; i++) {

    lists[i].style.backgroundColor = 'rgba(0,90,100,' + alpha + ')';

    alpha -= (1 / lists.length);
}

let myuser = new User();
let rank = new Rank();
let i = 2;

page('/', index)
page('*', index)

page('/menu', menu)
page('/task/:task', task)
page('/lectures', lectures)
page();

function notFound() {
    console.log('not!');
}

function task(task) {
    console.log(task.params.task);
}

function lectures() {

}

function menu() {

}