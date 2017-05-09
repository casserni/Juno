import bot from '../controllers/bot';
import 'isomorphic-fetch';
import { fetchCurrencies } from './data.js';
import handleSponsoredDialog from '../util/handle-sponsored-dialog.js';

bot.dialog('/list-currencies', [
  function (session) {
    fetchCurrencies()
    .then(data => {
      let response = `\n\tLook at all of our supported currencies!\n`;
      data.forEach((currency)=>{
        response += `\n\t- ${currency}`;
      });
      session.send(response);
      session.message.utu.intent('List Currencies')
        .then(handleSponsoredDialog(session))
        .catch(e => console.log(e));
    })
    session.endDialog()
  }
]).triggerAction({ matches: /list (all )?currencies/i });
