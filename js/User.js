import Rank from "./Rank";
import PouchDB from 'pouchdb-browser'

let database = new PouchDB('doobe');

export default class User {
    constructor() {
        // TODO load rank from DB
        this.rank = new Rank();

        database.allDocs({include_docs: true}).then(function (result) {
            console.log(result)
        }).catch(function (err) {
            console.log(err);
        });

        this.tasks = [];

    }

    addTask(task) {
        this.tasks.push(task);

        database.put(task);
    }

    removeTask(task) {
        this.tasks.remove(task);

        database.remove(task);
    }
}