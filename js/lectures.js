import $ from 'jquery';
import lecturesTemplate from '../templates/lectures.hbs'

export default function lectures() {
    $('.content').html(lecturesTemplate());
}