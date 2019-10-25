const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

class Starboard extends AkairoClient {
  constructor() {
    super({
      ownerID: '374886124126208000'
    }, {
      disableEveryone: true,
      partials: ['MESSAGE'],
      presence: {
        status: 'online',
        activity: {
          name: 'STARBOARD',
          type: 'WATCHING'
        }
      }
    });

    this.commandHandler = new CommandHandler(this, {directory: './bot/commands/', prefix: 's!'});
    this.listenerHandler = new ListenerHandler(this, {directory: './bot/events/'});

    this.listenerHandler.loadAll();
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
  }

}

const client = new Starboard();

client.login(process.env.TOKEN).then();