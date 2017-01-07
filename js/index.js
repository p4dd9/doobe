// import user from './User'
import * as database from "./database";
import tasksTemplate from '../templates/tasks.hbs'
import $ from 'jquery'
import page from "page";

import * as ui from './ui';

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

        ui.colorItems($items);
    }).catch(ui.displayError);
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

    database.removeTask(id).catch(ui.displayError);

    $task.slideUp(() => {
        $task.remove();
        ui.colorItems($items);
    });
}

function finishTask(task) {
    // Maybe we could remove this wrapping somehow?
    let $task = $(task);
    let id = $task.attr('data-id');

    database.getTask(id).then(task => {
        database.getRank().then(rank => {
            if (rank.addXp(task.xp)) {
                ui.displayLevelReward();
            }
            ui.updateRank(rank);
            ui.displayXpReward(task.xp);

            database.updateRank(rank).catch(ui.displayError);
        }).catch(ui.displayError);

        database.removeTask(id).catch(ui.displayError);
    }).catch(ui.displayError);

    $task.slideUp(() => {
        $task.remove();
        ui.colorItems($items);
    });
}