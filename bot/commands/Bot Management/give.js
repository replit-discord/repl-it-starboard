const FieldValue = require('firebase-admin').firestore.FieldValue;

const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const db = require('../../../db/database');

module.exports = class MinCommand extends Command {
  constructor() {
    super('give', {
      aliases: ['give', 'gift'],
      cooldown: 300000,
      description: 'Modifies the minimum star requirement for a message to be starred.',
      ratelimit: 5,
      channel: 'guild',
      ownerOnly: true,
      args: [{ id: 'user', type: 'user' }, { id: 'number', type: 'number' }]
    });
  }

  exec(message, args) {
    let newDoc = {};
    newDoc[args.user.id] = FieldValue.increment(args.number);
    db.upsert('guilds', message.guild.id, { users: newDoc })
      .then(() => {
        return message.channel.send(`> **UPDATED**\n> The user has been awarded ${args.number} stars.`);
      })
      .catch(err => {
        return message.channel.send(
          new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .setTimestamp()
            .addField('Error Message', `\`\`\`${err.message || err}\`\`\``)
            .addField('Report', 'Please report this error to the developers and they will try to fix the issue ASAP.')
        );
      });
  }
};
