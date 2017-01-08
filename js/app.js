import * as database from './database';
import $ from 'jquery';
import Rank from './Rank';
import page from 'page';
import index from './index';
import lectures from './lectures';
import taskForm from './task-form';
import * as ui from './ui';
import menu from './menu';
import errorTemplate from '../templates/error.hbs';
import notFoundTemplate from '../templates/not-found.hbs';
import Handlebars from 'handlebars/runtime';


page('/task/new', taskForm);
page('/task/:id', taskForm);
page('/lectures', lectures);
page('/error', () => $('.content').html(errorTemplate()));
page('/', index);
page('*', () => $('.content').html(notFoundTemplate()));
page();

menu();

Handlebars.registerHelper("remainingDays", remainingDays => {
    if (remainingDays < 0) {
        return `Due since ${Math.abs(remainingDays)} days!`
    } else if (remainingDays == 0) {
        return 'Due today!'
    } else if (remainingDays == 1) {
        return '1 day left!'
    }

    return `${remainingDays} days left`;
});