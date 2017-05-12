'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

require('isomorphic-fetch');

var _data = require('./data.js');

var _handleSponsoredDialog = require('../util/handle-sponsored-dialog.js');

var _handleSponsoredDialog2 = _interopRequireDefault(_handleSponsoredDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/list-currencies', [function (session) {
  (0, _data.fetchCurrencies)().then(function (response) {
    session.send(response);
    session.message.utu.intent('List Currencies').then((0, _handleSponsoredDialog2.default)(session)).catch(function (e) {
      return console.log(e);
    });
  });
  session.endDialog();
}]).triggerAction({ matches: /list (all )?currencies/i });