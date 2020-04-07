const { Command } = require('klasa');
const {MessageEmbed} = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['ui', 'whois'],
      guarded: true,
      description: language => language.get('COMMAND_USER_INFO_DESCRIPTION'),
      usage: '[user:member]',
      runIn: ['text'],
      promptLimit: 2
    });
  }

  async run(message, [user]) {
    let guildData = await this.client.db.getGuild(message.guild.id);

    if (!guildData)
      return await message.sendLocale('NO_SETUP');
    else {
      let userStars = guildData.members[user ? user.id : message.author.id] || 0;
      let userPosts = Object.values(guildData.starred).filter(x => x.author === (user ? user.id : message.author.id));

      return await message.send(new MessageEmbed()
        .setTitle('USER INFO')
        .setColor('YELLOW')
        .setThumbnail(user ? user.user.displayAvatarURL() : message.author.displayAvatarURL())
        .setTimestamp()
        .addField('Name', user ? user.displayName : message.member.displayName)
        .addField('ID', user ? user.id : message.author.id)
        .addField('Stars', userStars, true)
        .addField('Starred posts', userPosts.length || 0, true)
      );
    }
  }

};