import $ from "jquery";
import taskFormTemplate from "../templates/task-form.hbs"
import user from "./User";
import Task from "./Task";
import page from "page";
import {displayError} from "./ui";

let $content;

export default function taskForm(e) {
    let task;

    $content = $(".content");

    user.getLectures().then(result => {
        $content.html(taskFormTemplate({lectures: result}));

        $("form").submit(e => {
            e.preventDefault();

        console.log("form submitted");

        if (task != undefined) {
            task.text = $("#task-name").val();
            // task.remainingDays = $('#remaining-days').val(); please add the remaining days
        } else {
            task = new Task({"text": $("#task-name").val()});
        }

            user.addTask(task).then(page("/")).catch(displayError);

        });
    }).catch(displayError);


    let id = e.params.id;

    if (id !== undefined) {
        // We"re viewing a task
        user.getTask(id).then(result => {
            task = result;
            $("#task-name").val(task.text);
        })
    }
}