import PouchDB from 'pouchdb-browser'
import User from './User'
import tasksTemplate from '../templates/tasks.hbs'
import $ from 'jquery'

let database = new PouchDB('doobe');

export default function index() {
    database.changes({
        since: 'now',
        live: true
    }).on('change', () => {
        displayTasks();
    });
}

function displayTasks() {
    console.log(User.tasks);
    $('.doobe-wrapper__items').html(tasksTemplate({tasks: User.tasks}));
    // database.allDocs({
    //     include_docs: true
    // }).then(function (result) {
    //     console.log(result)
    //     // handle result
    // }).catch(function (err) {
    //     console.log(err);
    // });


}

$(window).ready(() => {
    displayTasks();
});
