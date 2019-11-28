const Command = require('../../core');
const { MessageEmbed } = require('discord.js');
const db = require('../../../db/database');

module.exports = class GuildInfoCommand extends Command {
  constructor() {
    super('serverinfo', {
      aliases: ['serverinfo', 'guildinfo'],
      cooldown: 60000,
      description: "Displays the server's current settings.",
      ratelimit: 5,
      icon: 'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/info-circle-outline-512.png'
    });
  }

  exec(message, args) {
    db.fetch('guilds', message.guild.id)
      .then(data => {
        const info = new MessageEmbed()
          .setTitle('GUILD INFO')
          .setTimestamp()
          .setThumbnail(message.guild.iconURL())
          .setColor('BLUE')
          .setFooter(`ID: ${message.guild.id}`)
          .addField('Server Name', message.guild.name)
          .addField('Minimum requirement', `${data.min} stars`)
          .addField('Starboard Channel', `<#${data.channel}>`);

        return message.channel.send(info);
      })
      .catch(err => {
        return message.channel.send(
          new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .setTimestamp()
            .addField('Error Message', `\`\`\`${err.message || err}\`\`\``)
            .addField(
              'Possible cause',
              'You may have not set up your server yet, please make sure you have your server set up.\n Use the `help` command to learn more.'
            )
            .addField('Report', 'Please report this error to the developers and they will try to fix the issue ASAP.')
        );
      });
  }
};
