import $ from 'jquery'
import Task from "./Task"
import User from './User'

export function initUi() {
    let myuser = new User();
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

    let lists = document.getElementsByClassName('task');
    let alpha = 1;

    for (let i = 0; i < lists.length; i++) {

        lists[i].style.backgroundColor = 'rgba(0,90,100,' + alpha + ')';

        alpha -= (1 / lists.length);
    }
}