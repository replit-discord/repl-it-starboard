const { Command, Argument } = require('discord-akairo');
const db = require('../../../db/database');

class MinCommand extends Command {
  constructor() {
    super('minimum', {
      aliases: ['minimum', 'min'],
      userPermissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
      cooldown: 300000,
      ratelimit: 5,
      channel: 'guild',
      args: [
        {
          id: 'minimum',
          type: Argument.range('number', 2, Infinity, true),
          prompt: {
            start:
              '> **Invalid Syntax.**\n> Please provide the new minimum number of stars required for a message to be starred.\n> \n> You can also use `cancel` to cancel the command.',
            retry:
              '> **Invalid Value.**\n> Please provide a valid number for the minimum number of stars required ( at least 2 ).\n> \n> You can also use `cancel` to cancel the command.',
            timeout: "> **Command timed out.**\n> You didn't provide a valid minimum number within time.",
            ended: '> **The End**\n> You used up all tries to provide a valid minimum number.',
            cancel: '> **Command cancelled**\n> Command has been cancelled successfully.'
          }
        }
      ]
    });
  }

  exec(message, args) {
    db.upsert('guilds', message.guild.id, { min: args.minimum })
      .then(() => {
        return message.channel.send(
          `> **UPDATED**\n> The minimum number of stars required for a message to be starred has been set to \`${args.minimum}\`.`
        );
      })
      .catch(err => {
        return message.channel.send(
          `> **ERROR**\n> ${err.message || err}\n> \n> Please report this error to the developers.`
        );
      });
  }
}

module.exports = MinCommand;
