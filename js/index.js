// import user from './User'
import * as database from "./database";
import tasksTemplate from '../templates/tasks.hbs'
import $ from 'jquery'
import page from "page";

import {colorItems, displayError} from './ui';

let $content;
let $items;

export default function index() {
    $content = $('.content');
    $('.control-bar__add-button').on('tap click', function () {
        $('.menu').fadeOut();
    });

    database.getTasks().then(tasks => {
        $content.html(tasksTemplate({tasks: tasks}));
        $items = $(".items");

        $('.task').on('click', function () {
            let id = $(this).attr("id");

            page(`/task/${id}`);
        });

        let taskNodes = document.querySelectorAll('.task');
        taskNodes.forEach(node => createHammerForTaskNode(node));

        colorItems($items);
    }).catch(displayError);
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
    let id = $task.attr('data-id');
    // console.log(id);

    database.removeTask(id).then(() => {
        $task.slideUp(() => {
            $task.remove();
            colorItems($items);
        });
    }).catch(displayError);
}

function finishTask(task) {
    // Maybe we could remove this wrapping somehow?
    let $task = $(task);
    let id = $task.attr('data-id');

    // console.log(id);
    // displayXpReward(user.getTask(id).getXp());

    database.finishTask(id).then(() => {
        $task.slideUp(() => {
            $task.remove();
            colorItems($items);
        });
    }).catch(displayError);
}

export function displayLevelReward() {
    $('.level-holder').css('animation', 'level-up 3s 1 ease-in-out');
    $('.level-content').fadeOut(1000).fadeIn(1000);
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