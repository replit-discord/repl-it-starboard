const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

class Starboard extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: '374886124126208000'
      },
      {
        disableEveryone: true,
        partials: ['MESSAGE'],
        presence: {
          status: 'online',
          activity: {
            name: 'STARBOARD',
            type: 'WATCHING'
          }
        }
      }
    );

<<<<<<< HEAD
    this.commandHandler = new CommandHandler(this, {
      directory: './bot/commands/',
      prefix: 's!',
      ignorePermissions: [this.ownerID],
      automateCategories: true
    });
=======
    this.commandHandler = new CommandHandler(this, { directory: './bot/commands/', prefix: '*' });
>>>>>>> 0185f2dd3310ec21aaa475533b14e47198f4cd63
    this.listenerHandler = new ListenerHandler(this, { directory: './bot/events/' });
    this.listenerHandler.loadAll();

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
  }
}

const client = new Starboard();

client.login(process.env.TOKEN).then();
