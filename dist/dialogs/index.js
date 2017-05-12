'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

require('./convert-currency');

require('./greeting.js');

require('./help.js');

require('./list-currencies.js');

require('./profile.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/', [function (session, results) {
  session.send('Try typing "help" to see a list of all the available commands!');
}]);