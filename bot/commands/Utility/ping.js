const { Command } = require('discord-akairo');

module.exports = class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      cooldown: 5000,
      ratelimit: 1
    });
  }

  exec(message, args) {
    let start = Date.now();
    message.channel
      .send('Pinging!')
      .then(msg => {
        return msg.edit(
          `Pong! The message round trip took \`${Date.now() - start}\`ms. The heartbeat ping is \`${
            this.client.ws.ping
          }\`ms.`
        );
      })
      .catch(console.error);
  }
};