import $ from 'jquery'

export default class Rank {
    constructor({xp = 0, level = 1, time = new Date()} = {}) {
        this._id = 'rank';
        this.xp = xp;
        this.level = level;
        this.time = time;
        this.maxProgress = this.getLevelXpMax(level);
        this.updateLevelXp();
    }

    addXp(value) {
        if (value + this.xp >= this.maxProgress) {
            this.level += 1;
            this.xp = 0;
        } else this.xp += value;
        this.updateLevelXp();
    }

    updateLevelXp() {
        $('.current_progress').width(this.xpToPercentage() + '%');
        this.maxProgress = this.getLevelXpMax(this.level); // recalculate maxProgress based on level
        $('.progress__information').html(this.xp + '/' + this.maxProgress);
        $('.level-content').html(this.level);
    }

    xpToPercentage() {
        return (this.xp / this.maxProgress) * 100;
    }

    getLevelXpMax(level) {
        if (level <= 1) return 100;
        else {
            return level * 100 + this.getLevelXpMax(level - 1);
        }
    }
}