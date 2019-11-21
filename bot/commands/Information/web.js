const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class WebCommand extends Command {
  constructor() {
    super('web', { aliases: ['web', 'website', 'site'], cooldown: 10000 });
  }
  exec(message, args) {
    let webEmbed = new MessageEmbed().setDescription(`[Visit website!](https://starboard--thedrone7.repl.co)`);
    return message.channel.send(webEmbed);
  }
};
