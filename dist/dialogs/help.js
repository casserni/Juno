'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

var _handleSponsoredDialog = require('../util/handle-sponsored-dialog.js');

var _handleSponsoredDialog2 = _interopRequireDefault(_handleSponsoredDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/help', [function (session) {
  session.send('\n      Here are a few of the things that I can help you with:\n      - list currencies\n      - convert CUR1 to CUR2\n      - change name\n      ');
  session.message.utu.intent('Help').then((0, _handleSponsoredDialog2.default)(session)).catch(function (e) {
    return console.log(e);
  });
  session.endDialog();
}]).triggerAction({ matches: /help/i });