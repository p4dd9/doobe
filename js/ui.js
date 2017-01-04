import page from "page";

export function initUi() {
    /*let hammer = new Hammer(document.querySelector('body'), { domEvents: true});


     hammer.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});

     hammer.on('swipedown', () => {
     $('.add-wrapper').slideDown();
     });

     hammer.on('swipeup', () => {
     $('.add-wrapper').slideUp();
     });

     console.log(hammer);
     */

}

export function colorTasks() {
    let tasks = document.querySelectorAll('.task');
    let alpha = 1;
    let offset = 1.0 / tasks.length;

    tasks.forEach(task => {
        task.style.opacity = alpha;
        alpha -= offset;
    });
}

export function displayError(error) {
    console.log('asdf' + error);
    page("/error");
}