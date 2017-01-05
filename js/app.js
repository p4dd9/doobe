import user from "./User";
import $ from "jquery";
import Rank from "./Rank";
import page from "page";
import index from "./index";
import lectures from "./lectures";
import taskForm from "./task-form";
import {initUi} from "./ui";
import {initMenu} from "./menu";
import errorTemplate from "../templates/error.hbs";
import notFoundTemplate from "../templates/not-found.hbs";

page("/task/new", taskForm);
page("/task/:id", taskForm);
page("/lectures", lectures);
page("/error", () => $(".content").html(errorTemplate()));
page("/", index);
page("*", () => $(".content").html(notFoundTemplate()));
page();

function notFound() {
    console.log("not!");
}

function task(task) {
    console.log(task.params.task);
}

initUi();
initMenu();