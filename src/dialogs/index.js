import bot from '../controllers/bot';
import './convert-currency';
import './greeting.js';
import './help.js';
import './list-currencies.js';
import './profile.js';

bot.dialog('/', [
  function (session, results) {
    session.send(`Try typing "help" to see a list of all the available commands!`);
  }
]);
