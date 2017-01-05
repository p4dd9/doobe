import user from "./User"
import $ from "jquery";
import {displayError, colorItems} from "./ui";
import Lecture from "./Lecture";
import lectureTemplate from "../templates/lecture.hbs";
import lecturesTemplate from "../templates/lectures.hbs";

let $content;
let $items;

export default function lectures() {
    $content = $(".content");

    displayLectures();
}

function displayLectures() {
    user.getLectures().then(result => {
        $content.html(lecturesTemplate({lectures: result}));
        $items = $(".items");

        let taskNodes = document.querySelectorAll(".lecture");
        taskNodes.forEach(createHammerForLectureNode);

        colorItems($items);

        $(".lecture-form").submit(e => {
            e.preventDefault();

            let name = $("#lecture-name").val();
            $("#lecture-name").val("");
            let lecture = new Lecture({name: name});

            user.addLecture(lecture).then(() => {
                let $lecture = $(lectureTemplate({lecture: lecture}));

                $lecture.hide();
                $lecture.appendTo($items);

                colorItems($items);

                $lecture.slideDown();

                createHammerForLectureNode($lecture[0])

            }).catch(displayError);
        })
    }).catch(displayError);

}

function createHammerForLectureNode(lectureNode) {
    let hammer = new Hammer(lectureNode);

    // Do we need swipe on the tasks?
    /*hammer.get("swipe").set({
     direction: Hammer.ALL
     });*/

    hammer.get("pan").set({
        threshold: 50
    });

    hammer.on("panend", event => {
        switch (event.direction) {
            case Hammer.DIRECTION_LEFT:
            case Hammer.DIRECTION_RIGHT:
                removeLecture(lectureNode);
                break;
        }
    });
}

function removeLecture(lectureNode) {
    // Maybe we could remove this wrapping somehow?
    let $lecture = $(lectureNode);
    let id = $lecture.attr("data-id");

    user.removeLecture(id).then(() => {
        $lecture.slideUp(() => {
            $lecture.remove();
            colorItems($items);
        });
    }).catch(displayError);
}