import * as database from "./database";
import $ from "jquery";
import page from "page";
import Rank from "./Rank";

export function initUi() {
    database.getRank().then(updateRank).catch(displayError);
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
    console.log("display" + error);
    page("/error");
}

export function updateRank(rank) {
    $(".current_progress").width(rank.xpInPercentage() + "%");
    $(".progress__information").html(rank.xp + "/" + Rank.getMaxXpForLevel(rank.level));
    $(".level-content").html(rank.level);
}

export function displayLevelReward() {
    $('.level-holder').css('animation', 'level-up 3s 1 ease-in-out');
    $('.level-content').fadeOut(1000).fadeIn(1000);
}

export function displayXpReward(amount) {
    let item = $("<div class='task-reward'><h3>REWARD</h3><span class='task-reward-content'>" + amount + "XP</span></div>").hide().fadeIn(2000);
    $('body').append(item);

    setTimeout(function () {
        setTimeout(function () {
            $('.task-reward').remove();
        }, 2000);
        $('.task-reward').fadeOut(1000);
    }, 3000);
}