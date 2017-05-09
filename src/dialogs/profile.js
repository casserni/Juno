import bot from '../controllers/bot';

bot.dialog('/profile', [
  function (session) {
    builder.Prompts.text(session, `Hi there! What's your name?`);
  },
  function (session, results) {
    session.userData.name = results.response;
    session.message.utu.event('Profile Setup').catch(e => console.log(e));
    session.endDialog();
  }
]);
