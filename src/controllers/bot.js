import builder from 'botbuilder';
import connector from './connector';
import utuMiddleware from '../middlewares/utu';

const bot = new builder.UniversalBot(connector);

bot.use(utuMiddleware);

export default bot
