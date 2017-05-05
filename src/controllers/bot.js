import builder from 'botbuilder';
import connector from './connector';

const bot = new builder.UniversalBot(connector);

export default bot
