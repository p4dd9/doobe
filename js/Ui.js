import $ from 'jquery'
import Task from "./Task"
import User from './User'

export function initUi() {
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
        // User.addXp(20).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // });

        User.addTask(new Task());
    });

    let applyColorToTasks = function () {
        let alpha = 1;

        $task.each(function () {

            $(this).css('opacity', alpha);
            alpha -= (1 / $task.length);
        });
    };

    applyColorToTasks();
}