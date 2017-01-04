import $ from 'jquery';

export function initMenu() {
    $('.control-bar__menu-button').on('click', () => {
        $('.menu').fadeToggle();
    });

    $('.menu').on('click', 'a', () => {
        console.log('click');
        $('.menu').fadeOut();
    });
}