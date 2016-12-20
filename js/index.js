import PouchDB from 'pouchdb-browser'

let database = new PouchDB('doobe');

export default function index() {
    console.log('index');

    database.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', () => {
        console.log('Change');
    });
}