import user from './User'
import taskTemplate from '../templates/task.hbs'
import tasksTemplate from '../templates/tasks.hbs'
import $ from 'jquery'

import {colorTasks} from './ui';
import Task from "./Task";

let $tasks;

export default function index() {
    // user.addListener('load-tasks', displayTasks);
    $tasks = $('.doobe-wrapper__items');
//     $(window).ready(() => {
//          displayTasks();
//     });
    $('.control-bar__bar-holder').on('click', () => {
        console.log('add task');
        // user.addXp(20).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // });

        let task = new Task();

        user.addTask(task).then(() => {
            let $task = $(taskTemplate({task: task}));
            $task.hide();
            $task.appendTo($tasks);
            $task.slideDown();

            createHammerForTaskNode($task[0]);

            colorTasks();
        }).catch(error => {
            // TODO show that task addition failed
            console.log(error);
        });
    });

    displayTasks();
}

function displayTasks() {
    user.getTasks().then(result => {
        document.querySelector('.doobe-wrapper__items').innerHTML = tasksTemplate({tasks: result});

        let taskNodes = document.querySelectorAll('.task');
        taskNodes.forEach(node => createHammerForTaskNode(node));

        colorTasks();
    }).catch(error => {
        // TODO Couldn't load tasks -> notify the user
        console.log(error);
    });
}

function createHammerForTaskNode(task) {
    let theTaskHammer = new Hammer(task);

    // Do we need swipe on the tasks?
    /*theTaskHammer.get('swipe').set({
     direction: Hammer.ALL
     });*/

    theTaskHammer.get('pan').set({
        threshold: 50
    });

    theTaskHammer.on('panend', event => {
        switch (event.direction) {
            case Hammer.DIRECTION_RIGHT:
                finishTask(task);
                break;
            case Hammer.DIRECTION_LEFT:
                removeTask(task);
                break;
        }
    });
}

function removeTask(task) {
    // Maybe we could remove this wrapping somehow?
    let $task = $(task);
    let id = $task.attr('id');
    // console.log(id);

    user.removeTask(id).then(() => {
        $task.slideUp(() => {
            $task.remove();

            colorTasks();
        });
    }).catch(error => console.log(error));
}

function finishTask(task) {
    // Maybe we could remove this wrapping somehow?
    let $task = $(task);
    let id = $task.attr('id');
    // console.log(id);

    user.finishTask(id).then(() => {
        $task.slideUp(() => {
           $task.remove();

           colorTasks();
        });
    }).catch(error => console.log(error));
}