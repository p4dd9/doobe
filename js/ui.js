import $ from 'jquery'
import Task from "./Task"
import Rank from "./Rank"
import User from './User'

export function initUi() {
    /*let onSwipe = Swiped.init({
     query: '.task',
     list: true,
     left: 200,
     right: 200,
     onOpen: function () {
     console.log("Open");
     colorTasks();
     },
     onClose: function () {
     colorTasks();
     }
     });*/

    let domTasks = document.getElementsByClassName('task');

    for (let task of domTasks) {

    }



    //myRank.addXp(350);
    //console.log("XP:" + myRank.xp);
    //console.log("Level:" + myRank.level);
    //myRank.addXp(650);
    //console.log("XP:" + myRank.xp);
    //console.log("Level:" + myRank.level);

    console.log($('.control-bar__bar-holder'));


}

export function colorTasks() {
    let tasks = document.querySelectorAll('.task');
    let alpha = 1;
    let offset = 1.0 / tasks.length;

    tasks.forEach(task => {
        task.style.opacity = alpha;
        alpha -= offset;
    });
}