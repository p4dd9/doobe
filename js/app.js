import User from './User' // moved to Ui.js
import Rank from './Rank'
import page from 'page'
import index from './index'
import {initUi} from './Ui.js'

initUi(); // reads current User and adds style

page('/', index)
page('*', index)

page('/menu', menu)
page('/task/:task', task)
page('/lectures', lectures)
page();

function notFound() {
    console.log('not!');
}

function task(task) {
    console.log(task.params.task);
}

function lectures() {

}

function menu() {

}