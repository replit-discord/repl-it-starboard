const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const db = require('../../db/database');

module.exports = class starAddListener extends Listener {
  constructor() {
    super('starAdd', {
      emitter: 'client',
      event: 'messageReactionAdd'
    });
  }

  async exec(reaction, user) {
    let msg = reaction.message.partial ? await reaction.message.fetch().catch(() => {}) : reaction.message;
    if (!msg.author.bot && msg.guild) {
      let emoji = reaction.emoji;
      let guildData = await db.fetch('guilds', msg.guild.id).catch(() => {});
      if (guildData) {
        if (emoji.name === '⭐') {
          let starCount = msg.reactions.get(emoji.name).count;
          if (msg.reactions.get(emoji.name).users.has(msg.author.id)) starCount -= 1;
          if (starCount > guildData.min - 1) {
            console.log('Starring message');
            let starboard = this.client.channels.get(guildData.channel);
            if (starboard) {
              if (Object.keys(guildData.starred).includes(msg.id)) {
                guildData.starred[msg.id].stars = starCount;
                guildData.users[msg.author.id] += 1;
                await db.upsert('guilds', msg.guild.id, guildData);

                let starMessage = await starboard.messages.fetch(guildData.starred[msg.id]['embedId']);
                let starEmbed = new MessageEmbed()
                  .setTitle('View message')
                  .addField('Author', msg.author, true)
                  .addField('Channel', msg.channel, true)
                  .setTimestamp(msg.createdTimestamp)
                  .setThumbnail(msg.author.avatarURL())
                  .setColor('YELLOW')
                  .setURL(msg.url)
                  .setFooter(`${starCount} stars (⭐)`);

                guildData.starred[msg.id].attachments
                  ? starEmbed.setImage(guildData.starred[msg.id].attachments)
                  : null;
                guildData.starred[msg.id].content
                  ? starEmbed.addField('Content', guildData.starred[msg.id].content)
                  : null;
                await starMessage.edit(starEmbed);
              } else {
                let attachment = msg.attachments.size > 0 ? msg.attachments.values().next().value.url : null;

                let newDoc = {
                  content: msg.content,
                  author: msg.author.id,
                  stars: starCount,
                  attachment: attachment,
                  embedId: null
                };

                let starEmbed = new MessageEmbed()
                  .setTitle('View message')
                  .addField('Author', msg.author, true)
                  .addField('Channel', msg.channel, true)
                  .setTimestamp(msg.createdTimestamp)
                  .setThumbnail(msg.author.avatarURL())
                  .setColor('YELLOW')
                  .setURL(msg.url)
                  .setFooter(`${starCount} stars (⭐)`);

                if (newDoc.content) starEmbed.addField('Content', newDoc.content);
                if (newDoc.attachments) starEmbed.setImage(newDoc.attachments);

                newDoc['embedId'] = (await starboard.send(starEmbed)).id;

                guildData.starred[msg.id] = newDoc;
                guildData.users[msg.author.id] > 1
                  ? (guildData.users[msg.author.id] += starCount)
                  : (guildData.users[msg.author.id] = starCount);
                await db.upsert('guilds', msg.guild.id, guildData);
              }
            }
          }
        }
      }
    }
  }
};