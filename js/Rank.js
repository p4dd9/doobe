export default class Rank {
    constructor({xp = 0, level = 1, time = new Date()} = {}) {
        this._id = 'rank';
        this.xp = xp;
        this.level = level;
        this.time = time;
    }

    addXp(value) {
        this.xp += value;
    }

    /***
     * http://onlyagame.typepad.com/only_a_game/2006/08/mathematics_of_.html
     */
}