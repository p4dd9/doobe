import user from './User'
import tasksTemplate from '../templates/tasks.hbs'
import $ from 'jquery'

import {colorTasks, displayError} from './ui';

let $content;

export default function index() {
    $content = $('.content');

    displayTasks();
}

function displayTasks() {
    user.getTasks().then(result => {
        $content.html(tasksTemplate({tasks: result}));

        $('.task').on('click', function () {
            console.log(this);
            let id = $(this).attr("id");

            window.location = `task/${id}`;
        });

        let taskNodes = document.querySelectorAll('.task');
        taskNodes.forEach(node => createHammerForTaskNode(node));

        colorTasks();
    }).catch(error => displayError(error));
}

function createHammerForTaskNode(task) {
    let theTaskHammer = new Hammer(task);

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
    }).catch(error => displayError(error));
}

function finishTask(task) {
    // Maybe we could remove this wrapping somehow?
    let $task = $(task);
    let id = $task.attr('id');

    // console.log(id);
    // displayXpReward(user.getTask(id).getXp());

    user.finishTask(id).then(() => {
        $task.slideUp(() => {
            $task.remove();
            colorTasks();
        });
    }).catch(error => displayError(error));
}

export function displayXpReward(amount) {
    let item = $("<div class='task-reward'><h3>REWARD</h3><span class='task-reward-content'>" + amount + "XP</span></div>").hide().fadeIn(2000);
    $('body').append(item);

    setTimeout(function () {
        setTimeout(function () {
            $('.task-reward').remove();
        }, 2000);
        $('.task-reward').fadeOut(1000);
    }, 3000);
}