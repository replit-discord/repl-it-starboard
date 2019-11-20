const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const db = require('../../../db/database');

module.exports = class LeaderboardCommand extends Command {
  constructor() {
    super('leaderboard', {
      aliases: ['leaderboard', 'leaders', 'leader', 'l'],
      cooldown: 10000,
      ratelimit: 1,
      args: [
        {
          id: 'page',
          type: Argument.range('number', 1, Infinity, true),
          default: 1
        }
      ]
    });
  }

  async exec(message, args) {
    let guildData = await db.fetch('guilds', message.guild.id).catch(err => {
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

    let users = [];

    for (const k of Object.keys(guildData.users)) {
      if (guildData.users[k] > 0) {
        let newDoc = {};
        let user = await this.client.users.fetch(k).catch(()=>{});
        if (user)
          newDoc[user.username] = guildData.users[k];
        else
          newDoc[`<${k}>`] = guildData.users[k];
        users.push(newDoc)
      }
    }

    if (users.length === 0) {
      return message.channel.send(
        new MessageEmbed()
          .setTitle('ERROR')
          .setColor('RED')
          .setTimestamp()
          .addField('Message', 'No messages starred. Try starring a few messages and retry.')
      );
    } else {
      let leaderEmbed = new MessageEmbed()
        .setTitle(`${message.guild.name} | Leaderboard`)
        .setColor('DARK_GOLD')
        .setTimestamp()
        .setThumbnail('https://cdn2.iconfinder.com/data/icons/flat-game-ui-buttons-icons-1/512/19-512.png');

      users.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
      let maxPages = Math.ceil(users.length / 7);

      if (args['page'] > maxPages) {
        return message.channel.send(
          new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .setTimestamp()
            .addField(
              'Cause',
              `> The leaderboard has only **${maxPages} pages**.\n> The one you requested is **non-existent**.`
            )
        );
      } else {
        for (let i = (args['page'] - 1) * 7; i < (args['page'] - 1) * 7 + 7; i++) {
          if (users[i]) {
            leaderEmbed.addField(`RANK ${i + 1}`, `__${Object.keys(users[i])[0]}__ **(${Object.values(users[i])[0]} stars)**`);
          }
        }

        leaderEmbed.setFooter(`Page ${args['page']} of ${maxPages}`);
        return message.channel.send(leaderEmbed);
      }
    }
  }
};
