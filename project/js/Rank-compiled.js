"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var Rank = function () {
    function Rank() {
        _classCallCheck(this, Rank);

        this.xp = 0;
        this.level = 1;

        if (!instance) {
            instance = this;
        }
        return instance;
    }

    _createClass(Rank, [{
        key: "addXp",
        value: function addXp(amount) {
            this.xp += amount;
        }

        /***
         * http://onlyagame.typepad.com/only_a_game/2006/08/mathematics_of_.html
         */

    }]);

    return Rank;
}();

exports.default = Rank;

//# sourceMappingURL=Rank-compiled.js.map