import $ from "jquery";
import page from "page";

export function initUi() {
}

export function colorItems($container) {
    let $children = $container.children();

    let lowerBound = 0.2;
    let range = 1.0 - lowerBound;
    let step = range / $children.length;

    $children.each((index, element) => {
        $(element).css("opacity", lowerBound + (range - index * step));
    });
}

export function displayError(error) {
    console.log('asdf' + error);
    page("/error");
}