import user from './User'
import $ from 'jquery'
import Rank from './Rank'
import page from 'page'
import index from './index'
import {initUi} from './ui.js'

page('/', index)
page('*', index)

page('/menu', menu)
page('/task/:task', task)
page('/lectures', lectures)
page();

initUi(); // reads current user and adds style

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