import user from './User'
import tasksTemplate from '../templates/tasks.hbs'
import $ from 'jquery'

import database from './database'

export default function index() {
    database.changes({
        since: 'now',
        live: true
    }).on('change', () => {
        displayTasks();
    });

//     $(window).ready(() => {
//          displayTasks();
//     });
}

function displayTasks() {
    $('.doobe-wrapper__items').html(tasksTemplate({tasks: user.tasks}));
    // database.allDocs({
    //     include_docs: true
    // }).then(function (result) {
    //     console.log(result)
    //     // handle result
    // }).catch(function (err) {
    //     console.log(err);
    // });


}