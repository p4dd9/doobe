import $ from 'jquery';

export default function menu() {
    $('.control-bar__menu-button').on('click', () => {
        $('.menu').fadeToggle();
    });

    $('.control-bar__add-button').on('tap click', function () {
        $('.menu').fadeOut();
    });

    $('.menu').on('click', 'a', () => {
        console.log('click');
        $('.menu').fadeOut();
    });
}