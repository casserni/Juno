import bot from '../controllers/bot';
import handleSponsoredDialog from '../util/handle-sponsored-dialog.js';

bot.dialog('/help', [
  function (session) {
    session.send(
      `
      Here are a few of the things that I can help you with:
      - list currencies
      - convert CUR1 to CUR2
      - change name
      `
    );
    session.message.utu.intent('Help')
      .then(handleSponsoredDialog(session))
      .catch(e => console.log(e));
    session.endDialog();
  }
]).triggerAction({matches: /help/i});
