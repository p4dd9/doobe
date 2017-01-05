import database from './database';
import Rank from './Rank';
import Task from './Task';
import { displayFinishTaskInformation as showTaskInfo } from "./index";
import Lecture from "./Lecture";

const RANK = 'rank';

class User {

    constructor() {
        database.get(RANK).then(result => {
            this.rank = new Rank(result);
            console.log(this.rank);
        }).catch(err => {
            console.log('Failed to fetch rank: ' + err.toString());
            const notFound = 404;

            if (notFound == err.status) {
                this.rank = new Rank();
                database.put(this.rank);
            }
        });
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            database.query(doc => {
                if ('task' == doc.type) {
                    emit(doc)
                }
            }, {include_docs: true}).then(result => {
                let tasks = [];

                result.rows.forEach(row => {
                    tasks.push(new Task(row.doc));
                });

                resolve(tasks);
            }).catch(error => reject(error));
        });
    }

    addTask(task) {
        console.log(task);
        // Promise
        return database.put(task);
    }

    removeTask(id) {
        return new Promise((resolve, reject) => {
            // First get the task...
            database.get(id).then(function (doc) {
                // ...then remove the task
                database.remove(doc).then(resolve).catch(reject);
            }).catch(resolve);
        });

        /*database.remove(task).then(result => {
         console.log(result);

         this.tasks.remove(task);

         this.fireEvent('load-tasks');
         }).catch(error => {
         console.log(error)
         });*/
    }

    finishTask(id) {
        return new Promise((resolve, reject) => {
            // First get the task...
            database.get(id).then(doc => {
                let task = new Task(doc);
                let xpGain = task.calcXpGain();

                console.log(xpGain);
                this.addXp(xpGain);
                showTaskInfo(xpGain);
                // ...then remove the task
                database.remove(doc).then(doc => resolve(doc)).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }

    getTask(id) {
        return new Promise((resolve, reject) => {
            database.get(id).then(doc => resolve(new Task(doc))).catch(error => reject(error));
        });
    }

    addXp(value) {
        this.rank.addXp(value);

        return new Promise((resolve, reject) => {
            // First get the rank...
            database.get(RANK).then(doc => {
                // ...then update the rank
                database.put({
                    _id: RANK,
                    _rev: doc._rev,
                    xp: this.rank.xp,
                    level: this.rank.level
                }).then(doc => resolve(doc)).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }

    getLectures() {
        return new Promise((resolve, reject) => {
            database.query(doc => {
                if ('lecture' == doc.type) {
                    emit(doc)
                }
            }, {include_docs: true}).then(result => {
                let lectures = [];

                result.rows.forEach(row => {
                    lectures.push(new Lecture(row.doc));
                });

                resolve(lectures);
            }).catch(error => reject(error));
        });
    }

    addLecture(lecture) {
        return database.put(lecture);
    }

    removeLecture(id) {
        return new Promise((resolve, reject) => {
            // First get the lecture...
            database.get(id).then(function (doc) {
                // ...then remove the lecture
                database.remove(doc).then(resolve).catch(reject);
            }).catch(reject);
        });
    }
}

export default new User();