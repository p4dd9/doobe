import $ from 'jquery'
import Task from "./Task"
import Rank from "./Rank"
import User from './User'
//import Hammer from '../node_modules/hammerjs/hammer'

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

    /*let myBody = document.getElementsByTagName('body')[0];
    let theHammer = new Hammer(myBody);
    theHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    theHammer.on('swipeleft swiperight swipeup swipedown', function (event) {
        event.preventDefault();
        alert("did u just swipe down?" + event.type);
    })*/

    let theTask = document.getElementsByClassName('task');

    for(let i = 0; i < theTask.length; i++) {
        let theTaskHammer = new Hammer(theTask[i]);

        theTaskHammer.get('swipe').set({
            direction: Hammer.ALL});

        theTaskHammer.get('pan').set({
            threshold: 100});

        theTaskHammer.on('panend', function (event) {
            switch(event.direction){
                case Hammer.DIRECTION_RIGHT:
                    alert("RIGHT - FINISH");
                    break;
                case Hammer.DIRECTION_LEFT:
                    alert("LEFT - DELETE");
                    break;
            }
        });
    }

    //$task.on('swiperight', destroyTarget);

    function destroyTarget() {
        this.remove();
    }

    let myRank = new Rank();
    myRank.addXp(2);
    myRank.addXp(97);
    console.log("XP:" + myRank.xp);
    console.log("Level:" + myRank.level);
    myRank.addXp(2);
    console.log("XP:" + myRank.xp);
    console.log("Level:" + myRank.level);
    myRank.addXp(175);
    console.log("XP:" + myRank.xp);

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