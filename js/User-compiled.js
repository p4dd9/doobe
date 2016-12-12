'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rank = require('./Rank');

var _Rank2 = _interopRequireDefault(_Rank);

var _pouchdbBrowser = require('pouchdb-browser');

var _pouchdbBrowser2 = _interopRequireDefault(_pouchdbBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var database = new _pouchdbBrowser2.default('doobe');

var User = function () {
    function User() {
        _classCallCheck(this, User);

        // TODO load rank from DB
        this.rank = new _Rank2.default();

        database.allDocs({ include_docs: true }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            console.log(err);
        });

        this.tasks = [];
    }

    _createClass(User, [{
        key: 'addTask',
        value: function addTask(task) {
            this.tasks.push(task);

            database.put(task);
        }
    }, {
        key: 'removeTask',
        value: function removeTask(task) {
            this.tasks.remove(task);

            database.remove(task);
        }
    }]);

    return User;
}();

exports.default = User;

//# sourceMappingURL=User-compiled.js.map