import $ from 'jquery'

export default class Rank {
    constructor({xp = 0, level = 1, time = new Date()} = {}) {
        this._id = 'rank';
        this.xp = xp;
        this.level = level;
        this.time = time;
        this.maxProgress = this.getXpMax();
    }

    addXp(value) {
        if (value + this.xp >= this.maxProgress) {
            this.level += 1;
            this.xp = 0;
        } else this.xp += value;

        $('.current_progress').width(this.xpToPercentage() + '%');
        this.maxProgress = this.getXpMax(); // recalculate maxProgress based on level
        $('.progress__information').html(this.xp + '/' + this.maxProgress);
    }

    xpToPercentage() {
        return (this.xp / this.maxProgress) * 100;
    }

    getXpMax() {
        switch (this.level) {
            case 1:
                return 100;
            case 2:
                return 200;
            case 3:
                return 300;
            case 4:
                return 500;
            case 5:
                return 800;
            case 6:
                return 1300;
            case 7:
                return 2100;
            case 8:
                return 3400;
            case 9:
                return 5500;
            case 10:
                return 8900;
        }
    }

    /***
     * http://onlyagame.typepad.com/only_a_game/2006/08/mathematics_of_.html
     */
}