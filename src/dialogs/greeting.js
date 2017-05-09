import bot from '../controllers/bot';

bot.dialog('/greeting', [
  function (session, args, next) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        next();
    }
  },
  function (session) {
    session.send(`Hey ${session.userData.name}!`);
    session.message.utu.intent('Greeting').catch(e => console.log(e));
    session.endDialog();
  }
]).triggerAction({ matches: /(hello|Hello|hi|Hi|hey|Hey)/i });
