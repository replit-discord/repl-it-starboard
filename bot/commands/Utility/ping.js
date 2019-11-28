const Command = require('../../core');

module.exports = class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      cooldown: 5000,
      description: "Checks the bot's connectivity to the discord servers",
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
