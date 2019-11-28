const { Listener } = require('discord-akairo');
const FieldValue = require('firebase-admin').firestore.FieldValue;
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
          let starCount = (await msg.reactions.get(emoji.name).users.fetch()).filter(u => u.id !== msg.author.id).size;

          if (starCount > guildData.min - 1) {
            let starboard = this.client.channels.get(guildData.channel);

            if (starboard) {
              if (Object.keys(guildData.starred).includes(msg.id)) {
                guildData.starred[msg.id].stars = starCount;
                guildData.users[msg.author.id] += 1;

                try {
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

                  guildData.starred[msg.id].attachment
                    ? starEmbed.setImage(guildData.starred[msg.id].attachment)
                    : null;
                  guildData.starred[msg.id].content
                    ? starEmbed.addField('Content', guildData.starred[msg.id].content)
                    : null;
                  await starMessage.edit(starEmbed);
                } catch (err) {
                  let starEmbed = new MessageEmbed()
                    .setTitle('View message')
                    .addField('Author', msg.author, true)
                    .addField('Channel', msg.channel, true)
                    .setTimestamp(msg.createdTimestamp)
                    .setThumbnail(msg.author.avatarURL())
                    .setColor('YELLOW')
                    .setURL(msg.url)
                    .setFooter(`${starCount} stars (⭐)`);

                  guildData.starred[msg.id].attachment
                    ? starEmbed.setImage(guildData.starred[msg.id].attachment)
                    : null;
                  guildData.starred[msg.id].content
                    ? starEmbed.addField('Content', guildData.starred[msg.id].content)
                    : null;
                  await starboard.send(starEmbed);
                }
              } else {
                let attachment = msg.attachments.size > 0 ? msg.attachments.first().url : null;

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
                if (newDoc.attachment) starEmbed.setImage(newDoc.attachment);

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
