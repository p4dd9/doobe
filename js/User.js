import database from './database';
import Rank from './Rank';
import Task from './Task';

const RANK = 'rank';

class User {

    constructor() {
        this.listeners = new Map();

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
        // Promise
        return database.put(task);
    }

    removeTask(id) {
        return new Promise((resolve, reject) => {
            // First get the task...
            database.get(id).then(function (doc) {
                // ...then remove the task
                database.remove(doc).then(doc => resolve(doc)).catch(error => reject(error));
            }).catch(error => reject(error));
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

                console.log(task.calcXpGain());

                this.addXp(task.calcXpGain());
                // ...then remove the task
                database.remove(doc).then(doc => resolve(doc)).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }

    getTask(task_id) {
        return database.get(task_id);
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

    addListener(event, fn) {

        if (this.listeners[event] === undefined) {
            this.listeners[event] = []
        }

        this.listeners[event].push(fn);
    }

    fireEvent(event) {
        this.listeners[event].forEach(fn => fn());
    }
}

export default new User();