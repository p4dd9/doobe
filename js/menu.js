import $ from 'jquery';

export function initMenu() {
    console.log('init menu');

    console.log('document ready');

    $('.control-bar__menu-button').on('click', () => {
        $('.menu').fadeToggle();
    });

    $('.menu').on('click', 'a', () => {
        console.log('click');
        $('.menu').fadeOut();
    });
}