'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/greeting', [_profile2.default, function (session) {
  console.log(session.message.ctx);
  session.send('Hey ' + session.message.ctx.user.firstName + '!');
  session.message.utu.intent('Greeting').catch(function (e) {
    return console.log(e);
  });
  session.endDialog();
}]).triggerAction({ matches: /(hello|Hello|hi|Hi|hey|Hey)/i });