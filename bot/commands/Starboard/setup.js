const Command = require('../../core');
const db = require('../../../db/database');

module.exports = class SetupCommand extends Command {
  constructor() {
    super('setup', {
      aliases: ['setup'],
      cooldown: 300000,
      description: 'Sets up the bot for your server and enables the starboard facility.',
      details:
        'Sets up the bot for your server and enables the starboard facility.\n**You need to be an admin to be able to use this command.**',
      ratelimit: 1,
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
      ],
      userPermissions: ['ADMINISTRATOR'],
      examples: ['setup #starboard', 'setup chat'],
      argumentDetails: [{ name: 'channel', required: true, description: 'The channel to be used for the starboard.' }],
      icon:
        'https://cdn1.iconfinder.com/data/icons/interface-white-with-multicolor-circle-background/2048/Settings-512.png'
    });
  }
  exec(message, args) {
    if (message.channel.permissionsFor(message.guild.me).has('MANAGE_CHANNELS'))
      message.channel.overwritePermissions({
        permissionOverwrites: [
          { id: message.guild.id, deny: ['SEND_MESSAGES'] },
          { id: message.author.id, allow: ['SEND_MESSAGES'] }
        ]
      });

    db.save('guilds', message.guild.id, {
      channel: args.channel.id,
      min: 4,
      starred: {},
      users: {}
    })
      .then(() => {
        message.react('☑').catch();
        return message.channel.send(
          `> **SUCCESS**\n> Starboard has been successfully set up for **\`${message.guild.name}\`**.`
        );
      })
      .catch(err => {
        console.error(err);
        return message.channel.send(
          `An error occurred - \`${err.message}\`.\nPlease report this to the developers for more help.`
        );
      });
  }
};
