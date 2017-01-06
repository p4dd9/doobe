import $ from 'jquery'
import {displayLevelReward} from './index'

export default class Rank {
    constructor({_rev, xp = 0, level = 1} = {}) {
        // Database fields
        this._id = "rank";
        this._rev = _rev;
        this.xp = xp;
        this.level = level;

        // Other fields
        this.maxProgress = Rank.getMaxXpForLevel(level);
        this.updateLevelXp();
    }

    toDocument() {
        return {
            _id: this._id,
            _rev: this._rev,
            xp: this.xp,
            level: this.level
        }
    }

    addXp(value) {
        if (value + this.xp >= this.maxProgress) {
            displayLevelReward();
            this.xp = (this.xp + value) - this.maxProgress
            this.level += 1;
        } else this.xp += value;
        this.updateLevelXp();
    }

    updateLevelXp() {
        $('.current_progress').width(this.xpToPercentage() + '%');
        this.maxProgress = Rank.getMaxXpForLevel(this.level); // recalculate maxProgress based on level
        $('.progress__information').html(this.xp + '/' + this.maxProgress);
        $('.level-content').html(this.level);
    }

    xpToPercentage() {
        return (this.xp / this.maxProgress) * 100;
    }

    static getMaxXpForLevel(level) {
        if (level <= 1) return 100;

        return level * 100 + Rank.getMaxXpForLevel(level - 1);
    }
}