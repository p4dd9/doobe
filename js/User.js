import Rank from "./Rank";
import PouchDB from 'pouchdb-browser'
import Task from './Task';

const DB_NAME = 'doobe';
const RANK = 'rank';

// let database = new PouchDB(DB_NAME);

class User {

    constructor() {
        this.database = new PouchDB(DB_NAME);

        // TODO load rank from DB
        this.database.get(RANK).then(result => {
            this.rank = new Rank(result);
            console.log(this.rank);
        }).catch(err => {
            console.log('Failed to fetch rank: ' + err.toString());
            const notFound = 404;

            if (notFound == err.status) {
                this.rank = new Rank();
                this.database.put(this.rank);
            }
        });

        this.database.query(doc => {
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

        this.database.put(task);
    }

    removeTask(task) {
        this.database.remove(task).then(result => {
            console.log(result);

            this.tasks.remove(task);
        }).catch(error => {
            console.log(error)
        });
    }

    addXp(value) {
        this.rank.addXp(value);

        return this.database.get(RANK).then(doc => {
            return this.database.put({
                _id: RANK,
                _rev: doc._rev,
                xp: this.rank.xp
            });
        })
    }
}

export default new User();