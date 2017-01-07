export default class Rank {
    constructor({_rev, xp = 0, level = 1} = {}) {
        // Database fields
        this._rev = _rev;
        this.xp = xp;
        this.level = level;
    }

    toDocument() {
        return {
            _id: "rank",
            _rev: this._rev,
            xp: this.xp,
            level: this.level
        }
    }

    addXp(value) {
        let maxXpForLevel = Rank.getMaxXpForLevel(this.level);

        if (value + this.xp >= maxXpForLevel) {
            this.xp = (this.xp + value) - maxXpForLevel;
            this.level += 1;

            return true;
        }

        this.xp += value;
        return false
    }

    xpInPercentage() {
        return (this.xp / Rank.getMaxXpForLevel(this.level)) * 100;
    }

    static getMaxXpForLevel(level) {
        if (level <= 1) return 100;
        return level * 100 + Rank.getMaxXpForLevel(level - 1);
    }
}