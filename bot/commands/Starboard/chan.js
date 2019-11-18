const { Command } = require('discord-akairo');
const db = require('../../../db/database');

class ChannelCommand extends Command {
  constructor() {
    super('channel', {
      aliases: ['channel', 'chan'],
      userPermissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
      cooldown: 300000,
      ratelimit: 5,
      channel: 'guild',
      args: [
        {
          id: 'channel',
          type: 'textChannel',
          prompt: {
            start:
              '> **Invalid syntax.**\n> Please provide the channel to be used for the starboard.\n\n> You can also use `cancel` to cancel the command.',
            retry:
              '> **Invalid channel provided.**\n> Please make sure it is of the format: -\n> `#channel` OR `channel` OR `channel-id` OR `channel.\n\n> You can also use `cancel` to cancel the command.',
            timeout: "> **Command timed out.**\n> You didn't provide a valid channel for the starboard within time.",
            ended: '> **The End**\n> You used up all tries to provide a valid channel.',
            cancel: '> **Command cancelled**\n> Command has been cancelled successfully.'
          }
        }
      ]
    });
  }

  exec(message, args) {
    db.upsert('guilds', message.guild.id, { channel: args.channel.id })
      .then(() => {
        return message.channel.send(
          `> **UPDATED**\n> The channel for the starboard has been set to \`${args.channel}\`.`
        );
      })
      .catch(err => {
        return message.channel.send(
          `> **ERROR**\n> ${err.message || err}\n\n> Please report this error to the developers.`
        );
      });
  }
}

module.exports = ChannelCommand;
