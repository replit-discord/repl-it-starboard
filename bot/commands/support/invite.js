const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class InviteCommand extends Command {
  constructor() {
    super('invite', {aliases: 'invite', cooldown: 10000});
  }
  exec(message, args) {
    let inviteEmbed = new MessageEmbed()
      .setDescription(`[Invite me!](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=117824&guild_id=437048931827056642)`);
    return  message.channel.send(inviteEmbed);
  }
};