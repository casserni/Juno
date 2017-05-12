import bot from '../controllers/bot';
import verifyUserProfile from './profile';

bot.dialog('/greeting', [
  verifyUserProfile,
  function (session) {
    console.log(session.message.ctx)
    session.send(`Hey ${session.message.ctx.user.firstName}!`);
    session.message.utu.intent('Greeting').catch(e => console.log(e));
    session.endDialog();
  }
]).triggerAction({ matches: /(hello|Hello|hi|Hi|hey|Hey)/i });
