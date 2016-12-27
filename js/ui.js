import $ from 'jquery'
import Task from "./Task"
import User from './User'

export function initUi() {
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
        // user.addXp(20).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // });

        User.addTask(new Task());
    });


}

export function colorTasks() {
    let tasks = document.querySelectorAll('.task');
    let alpha = 1;
    let offset = 1.0 / tasks.length;

    tasks.forEach(task => {
        task.style.opacity = alpha;
        alpha -= offset;
    });
}