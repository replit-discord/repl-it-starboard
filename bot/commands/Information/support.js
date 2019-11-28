const Command = require('../../core');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportCommand extends Command {
  constructor() {
    super('support', {
      aliases: ['support', 'server'],
      cooldown: 10000,
      description: "Sends a link to join the bot's support server!",
      icon: 'https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png'
    });
  }
  exec(message, args) {
    let supportEmbed = new MessageEmbed().setDescription(`[Join the support server!](https://discord.gg/4mmeuEV)`);
    return message.channel.send(supportEmbed);
  }
};
