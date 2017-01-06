import database from './database';
import Rank from './Rank';
import Task from './Task';
import {displayXpReward as showTaskInfo} from "./index";
import Lecture from "./Lecture";

const RANK = 'rank';

class User {

    constructor() {

    }



    addXp(value) {
        this.rank.addXp(value);

        return new Promise((resolve, reject) => {
            // First get the rank...
            database.get(RANK).then(doc => {
                // ...then update the rank
                database.put({
                    _id: RANK,
                    _rev: doc._rev,
                    xp: this.rank.xp,
                    level: this.rank.level
                }).then(resolve).catch(reject);
            }).catch(reject);
        });
    }


}

export default new User();