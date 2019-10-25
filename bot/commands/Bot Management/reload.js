const {Command} = require('discord-akairo');

module.exports = class extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload', 'r', 'refresh'],
      ownerOnly: true
    });
  }

  exec(message, args) {
    this.client["listenerHandler"].reloadAll();
    this.client["commandHandler"].reloadAll();

    return message.channel.send('Commands and Event listeners reloaded!');
  }
};