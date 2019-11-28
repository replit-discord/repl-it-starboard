const Command = require('../../core');

module.exports = class extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload', 'r', 'refresh'],
      ownerOnly: true,
      description:
        'Reloads all events and commands and applies the modifications made since restart. Only usable by bot owner.'
    });
  }

  exec(message, args) {
    this.client['listenerHandler'].reloadAll();
    this.client['commandHandler'].reloadAll();

    return message.channel.send('Commands and Event listeners reloaded!');
  }
};
