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

        database.query(doc => {
            if ('task' == doc.type) {
                emit(doc)
            }
        }, {include_docs: true}).then(result => {
            this.tasks = [];

            result.rows.forEach(row => {
                this.tasks.push(new Task(row.doc));
            });

            // for (let i = 0; i < result.rows.length; i++) {
            //     this.tasks.push(new Task(result.rows[i].doc));
            // }

            // console.log(this.tasks)

            this.fireEvent('load-tasks');
        }).catch(error => {
            console.log(error)
        });
    }

    addTask(task) {
        this.tasks.push(task);

        database.put(task);

        this.fireEvent('load-tasks');
    }

    removeTask(task) {
        database.remove(task).then(result => {
            console.log(result);

            this.tasks.remove(task);

            this.fireEvent('load-tasks');
        }).catch(error => {
            console.log(error)
        });
    }

    addXp(value) {
        this.rank.addXp(value);

        return database.get(RANK).then(doc => {
            return database.put({
                _id: RANK,
                _rev: doc._rev,
                xp: this.rank.xp
            });
        })
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