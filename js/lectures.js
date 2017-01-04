import $ from 'jquery';
import tasksTemplate from '../templates/lectures.hbs'

export default function lectures() {
    $('.content').html(tasksTemplate());
}