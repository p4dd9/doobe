import $ from 'jquery'
import Task from "./Task"
import User from './User'

export function initUi() {
    let myuser = new User();
    let $task = $('.task');

    let onSwipe = Swiped.init({
        query: '.doobe-wrapper__items > .task',
        list: true,
        left: 200,
        right: 200,
        onOpen: function () {
            applyColorToTasks();
            console.log("Open");
        },
        onClose: function () {
            applyColorToTasks();
        }
    });

    //$task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }

    $('.control-bar__bar-holder').on('click', () => {
        let t = new Task();
        t.taskText = 'New task';
        myuser.addTask(t);
    });

    let applyColorToTasks = function () {
        let alpha = 1;

        for (let i = 0; i < $task.length; i++) {

            $task[i].style.backgroundColor = 'rgba(0,90,100,' + alpha + ')';

            alpha -= (1 / $task.length);
        }
    };

    applyColorToTasks();
}