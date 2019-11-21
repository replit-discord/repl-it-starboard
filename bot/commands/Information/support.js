const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportCommand extends Command {
  constructor() {
    super('support', { aliases: ['support', 'server'], cooldown: 10000 });
  }
  exec(message, args) {
    let supportEmbed = new MessageEmbed().setDescription(`[Join the support server!](https://discord.gg/4mmeuEV)`);
    return message.channel.send(supportEmbed);
  }
};
