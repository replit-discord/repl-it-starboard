const Command = require('../../core');
const { MessageEmbed } = require('discord.js');

module.exports = class InviteCommand extends Command {
  constructor() {
    super('invite', {
      aliases: ['invite'],
      cooldown: 10000,
      description: 'Sends a link to invite the bot to your server!',
      icon: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/info-circle-outline-512.png'
    });
  }
  exec(message, args) {
    let inviteEmbed = new MessageEmbed().setDescription(
      `[Invite me!](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=117824&guild_id=437048931827056642)`
    );
    return message.channel.send(inviteEmbed);
  }
};
