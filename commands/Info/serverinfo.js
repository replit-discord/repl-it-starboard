const { Command } = require('klasa');
const {MessageEmbed} = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['si', 'gi', 'guildinfo'],
      guarded: true,
      description: language => language.get('COMMAND_SERVER_INFO_DESCRIPTION'),
      runIn: ['text']
    });
  }

  async run(message) {
    let guildData = await this.client.db.getGuild(message.guild.id);
    if (!guildData)
      return await message.sendLocale('NO_SETUP');
    else {
      return await message.send(new MessageEmbed()
        .setTitle('SERVER INFO')
        .setColor('YELLOW')
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .addField('Name', message.guild.name)
        .addField('ID', message.guild.id)
        .addField('Channel', `<#${guildData.channel}>`, true)
        .addField('Minimum', guildData.minimum, true)
        .addField('Star Emoji', message.guild.emojis.cache.find(e => e.name === guildData.emoji) || '⭐')
      );
    }
  }

};