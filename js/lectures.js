import user from "./User"
import $ from "jquery";
import lectureTemplate from "../templates/lecture.hbs";
import lecturesTemplate from "../templates/lectures.hbs";
import {displayError, colorTasks} from "./ui";
import Lecture from "./Lecture";

let $content;

export default function lectures() {
    $content = $(".content");



    displayTasks();
}

function displayTasks() {
    user.getLectures().then(result => {
        $content.html(lecturesTemplate({lectures: result}));

        let taskNodes = document.querySelectorAll(".task");
        taskNodes.forEach(node => createHammerForTaskNode(node));

        colorTasks();

        $(".lecture-form").submit(e => {
            e.preventDefault();

            let name = $("#lecture-name").val();
            $("#lecture-name").val("");
            let lecture = new Lecture({name: name});

            user.addLecture(lecture).then(() => {
                let $lecture = $(lectureTemplate({lecture: lecture}));

                $lecture.hide();
                $lecture.appendTo($(".items"));

                colorTasks();

                $lecture.slideDown();

                createHammerForTaskNode($lecture[0])

            }).catch(displayError);
        })

    }).catch(error => displayError(error));

}

function createHammerForTaskNode(task) {
    let theTaskHammer = new Hammer(task);

    // Do we need swipe on the tasks?
    /*theTaskHammer.get("swipe").set({
     direction: Hammer.ALL
     });*/

    theTaskHammer.get("pan").set({
        threshold: 50
    });

    theTaskHammer.on("panend", event => {
        switch (event.direction) {
            case Hammer.DIRECTION_RIGHT:
                removeTask(task);
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
    let id = $task.attr("data-id");
    // console.log(id);

    user.removeLecture(id).then(() => {
        $task.slideUp(() => {
            $task.remove();
            colorTasks();
        });
    }).catch(error => displayError(error));
}