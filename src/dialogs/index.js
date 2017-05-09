import bot from '../controllers/bot'
import builder from 'botbuilder';
import 'isomorphic-fetch'
import { fetchCurrencies, fetchExchangeRate } from './data.js'

let intents = new builder.IntentDialog();
bot.dialog('/', intents);

bot.dialog('/help',[
  function (session) {
    session.send(
      `
      Here are a few of the things that I can help you with:
      - list currencies
      - convert
      - help
      `
    );
    session.endDialog();
  }
])

bot.dialog('/profile', [
  function (session) {
    builder.Prompts.text(session, `Hi there! What's your name?`);
  },
  function (session, results) {
    session.userData.name = results.response;
    session.message.utu.event('Profile Setup').catch(e => console.log(e))
    session.endDialog();
  }
]);

intents.onDefault([
  function (session, args, next) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        next();
    }
  },
  function (session, results) {
    session.send(`Try typing "help" to see a list of all the available commands!`);
  }
]);

intents.matches(/(hello|Hello|hi|Hi|hey|Hey)/i,[
  function (session, args, next) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        next();
    }
  },
  function (session) {
    session.send(`Hey ${session.userData.name}!`)
    session.message.utu.intent('Greeting').catch(e => console.log(e))
  }
])

intents.matches(/help/i, [
  function (session) {
    // console.log(JSON.stringify(session.message.utu, null, 2))
    session.beginDialog('/help');
    session.message.utu.intent('Help').catch(e => console.log(e))
  }
]);

intents.matches(/list (all )?currencies/i, [
  function (session) {
    fetchCurrencies()
    .then(response => {
      session.send(response)
      session.message.utu.intent('List Currencies').catch(e => console.log(e));
    })
  }
]);

intents.matches(/^convert \w{3} to \w{3}/i,[
  function (session) {
    fetchExchangeRate(session.message.text.split(/\s+/)[1], session.message.text.split(/\s+/)[3])
    .then(response => {
      session.send(response)
      session.message.utu.intent('Convert').catch(e => console.log(e))
    })
  }
])
