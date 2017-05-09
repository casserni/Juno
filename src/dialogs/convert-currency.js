import bot from '../controllers/bot';
import 'isomorphic-fetch';
import { fetchExchangeRate } from './data.js';
import handleSponsoredDialog from '../util/handle-sponsored-dialog.js';

bot.dialog('./convert-currency',[
  function (session) {
    fetchExchangeRate(session.message.text.split(/\s+/)[1], session.message.text.split(/\s+/)[3])
      .then(response => {
        session.send(response);
        session.message.utu.intent('Conversion')
      .then(handleSponsoredDialog(session))
      .catch(e => console.log(e));
    })
    session.endDialog();
  }
]).triggerAction({matches: /^convert \w{3} to \w{3}/i });
