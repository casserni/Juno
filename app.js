var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

var counter = 0
intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
      session.send(`Hey ${session.userData.name}!`);
      counter += 1;
      if (counter == 1){
        session.beginDialog('/help');
      }
    }
]);

intents.matches(/^help/i, [
  function (session) {
    session.beginDialog('/help');
  }
]);

intents.matches(/^list currencies/i, [
  function (session) {
    session.beginDialog('/help');
  }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

bot.dialog('/help',[
  function (session) {
    session.send(
`
Here are a few of the things that I can help you with:
- list currencies
- help
`
    );
    session.endDialog();
  }
])
