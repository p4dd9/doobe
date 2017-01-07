import * as database from "./database";

import $ from "jquery";
import taskFormTemplate from "../templates/task-form.hbs"
import Task from "./Task";
import page from "page";
import {displayError} from "./ui";

let $content;

export default function taskForm(e) {
    let task;

    $content = $(".content");

    database.getLectures().then(lectures => {
        $content.html(taskFormTemplate({lectures: lectures}));

        // WORKLOAD
        let $workloadNum = $('.workload-num');

        $workloadNum.on('click tap', function () {
            $(".selected").each(function () {
                $(this).removeClass('selected');
            });

            $(this).addClass('selected');
        });
        // END WORKLOAD

        $("form").submit(e => {
            e.preventDefault();

            console.log("form submitted");

            let lectureId = $(".asdf-form option:selected").attr("data-id");
            console.log(lectureId);

            let name = $("#task-name").val();
            let days = $("#remaining-days").val();
            let workload = parseInt($(".selected").html());

            console.log(workload);

            // hr, min, s, ms
            let due = new Date(Date.now() + days * 24 * 60 * 60 * 1000).getTime();

            if (task === undefined) {
                task = new Task({due: due});
            }

            task.name = name;
            task.due = due;
            task.workload = workload;
            task.randomFactor = Math.floor(Math.random() * 50 + 1);
            task.lectureId = lectureId;

            console.log(task);

            database.addTask(task).then(page("/")).catch(displayError);
        });


        let id = e.params.id;

        if (id !== undefined) {
            // We"re viewing a task
            database.getTask(id).then(result => {
                task = result;
                console.log(task);

                $("#task-name").val(task.name);
                $("#remaining-days").val(task.remainingDays);
                $(".asdf-form option[data-id=" + task.lectureId + "]").attr('selected', 'selected');

            })
        }
    }).catch(displayError);
}