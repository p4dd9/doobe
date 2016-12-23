let instance = null; // singleton pattern

export default class Rank {
    constructor(rank) {
        this._id = rank;
        this.xp = 0;
        this.level = 1;
        this.time = new Date();

        if (!instance) {
            instance = this;
        }
        return instance;
    }

    addXp(value) {
        this.xp += value;
    }

    /***
     * http://onlyagame.typepad.com/only_a_game/2006/08/mathematics_of_.html
     */
}