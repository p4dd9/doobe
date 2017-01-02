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
        let theTaskHammer = new Hammer(task);

        theTaskHammer.get('swipe').set({
            direction: Hammer.ALL
        });

        theTaskHammer.get('pan').set({
            threshold: 100
        });

        theTaskHammer.on('panend', function (event) {
            switch (event.direction) {
                case Hammer.DIRECTION_RIGHT:
                    finishTask(task);
                    break;
                case Hammer.DIRECTION_LEFT:
                    deleteTask(task);
                    break;
            }
        });
    }

    function deleteTask(task) {
        let mytask = $(task);
        mytask.fadeOut(1000, function () {
            for (let i = 0; i < User.tasks.length; i++) {
                console.log("DB task id:" + User.tasks[i]._id);
                console.log("Current DOM Task id:" + mytask.attr('id'));

                if (User.tasks[i]._id === mytask.attr('id')) {
                    User.removeTask(User.tasks[i]);
                    mytask.remove();
                    console.log("deleted task with id: " + User.tasks[i]._id)
                    break;
                }
            }
        });
    }

    function finishTask() {
        let mytask = $(task);
        mytask.fadeOut(1000, function () {
            mytask.remove();
        });
    }

    let myRank = new Rank();
    console.log("XP:" + myRank.xp);
    console.log("Level:" + myRank.level);
    myRank.addXp(2);
    myRank.addXp(98);
    console.log("XP:" + myRank.xp);
    console.log("Level:" + myRank.level);
    //myRank.addXp(100);
    //myRank.addXp(98);
    console.log("XP:" + myRank.xp);
    console.log("Level:" + myRank.level);
    //myRank.addXp(350);
    //console.log("XP:" + myRank.xp);
    //console.log("Level:" + myRank.level);
    //myRank.addXp(650);
    //console.log("XP:" + myRank.xp);
    //console.log("Level:" + myRank.level);

    $('.control-bar__bar-holder').on('click', () => {
        // user.addXp(20).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // });

        User.addTask(new Task());
    });
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