export default class Rank {
    constructor(xp = 0, name = 'example-name') {
        this.xp = xp;
        this.name = name;
    }

    addXp(amount){
        this.xp += amount;
    }

    setRankName(name) {
        this.name = name;
    }
}