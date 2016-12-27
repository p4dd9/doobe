import Rank from "./Rank";
import Task from "./Task";
import database from "./database";

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

            console.log(this.tasks)
        }).catch(error => {
            console.log(error)
        });
    }

    addTask(task) {
        this.tasks.push(task);

        database.put(task);
    }

    removeTask(task) {
        database.remove(task).then(result => {
            console.log(result);

            this.tasks.remove(task);
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
}

export default new User();