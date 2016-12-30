import user from './User'
import tasksTemplate from '../templates/tasks.hbs'
import {initUi} from './ui.js'

import {colorTasks} from './ui';

export default function index() {
    user.addListener('load-tasks', displayTasks);

//     $(window).ready(() => {
//          displayTasks();
//     });
}

function displayTasks() {
    document.querySelector('.doobe-wrapper__items').innerHTML = tasksTemplate({tasks: user.tasks});
    // database.allDocs({
    //     include_docs: true
    // }).then(function (result) {
    //     console.log(result)
    //     // handle result
    // }).catch(function (err) {
    //     console.log(err);
    // });

    initUi();

    colorTasks();
}