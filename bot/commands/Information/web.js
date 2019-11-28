const Command = require('../../core');
const { MessageEmbed } = require('discord.js');

module.exports = class WebCommand extends Command {
  constructor() {
    super('web', {
      aliases: ['web', 'website', 'site'],
      cooldown: 10000,
      description: "Sends a link to the bot's website!",
      icon: 'https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Globe-2-512.png'
    });
  }
  exec(message, args) {
    let webEmbed = new MessageEmbed().setDescription(`[Visit website!](https://starboard--thedrone7.repl.co)`);
    return message.channel.send(webEmbed);
  }
};
