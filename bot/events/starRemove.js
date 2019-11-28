const { Listener } = require('discord-akairo');
const { firestore } = require('firebase-admin');
const { MessageEmbed } = require('discord.js');
const db = require('../../db/database');

module.exports = class starRemoveListener extends Listener {
  constructor() {
    super('starRemove', {
      emitter: 'client',
      event: 'messageReactionRemove'
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

          let starboard = this.client.channels.get(guildData.channel);
          if (starboard) {
            if (starCount > guildData.min - 1) {
              if (Object.keys(guildData.starred).includes(msg.id)) {
                guildData.starred[msg.id].stars = starCount;
                guildData.users[msg.author.id] -= 1;
                await db.upsert('guilds', msg.guild.id, guildData);

                let starMessage = await starboard.messages
                  .fetch(guildData.starred[msg.id]['embedId'])
                  .catch(console.error);
                let starEmbed = new MessageEmbed()
                  .setTitle('View message')
                  .addField('Author', msg.author, true)
                  .addField('Channel', msg.channel, true)
                  .setTimestamp(msg.createdTimestamp)
                  .setThumbnail(msg.author.avatarURL())
                  .setColor('YELLOW')
                  .setURL(msg.url)
                  .setFooter(`${starCount} stars (⭐)`);

                guildData.starred[msg.id].attachment ? starEmbed.setImage(guildData.starred[msg.id].attachment) : null;
                guildData.starred[msg.id].content
                  ? starEmbed.addField('Content', guildData.starred[msg.id].content)
                  : null;
                await starMessage.edit(starEmbed);
              }
            } else {
              if (Object.keys(guildData.starred).includes(msg.id)) {
                let embedId = guildData.starred[msg.id].embedId;
                let starMessage = await starboard.messages.fetch(embedId);
                guildData.starred[msg.id] = firestore.FieldValue.delete();
                guildData.users[msg.author.id] -= guildData.min;

                await db.upsert('guilds', msg.guild.id, guildData);

                await starMessage.delete();
              }
            }
          }
        }
      }
    }
  }
};
