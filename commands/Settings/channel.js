const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['chan', 'board'],
      description: language => language.get('COMMAND_CHANNEL_DESCRIPTION'),
      usage: '<channel:channel>',
      runIn: ['text'],
      permissionLevel: 6,
      promptLimit: 3
    });
  }

  async run(message, [channel]) {
    if (!(await this.client.db.getGuild(message.guild.id)))
      return await message.sendLocale('NO_SETUP');
    else {
      await this.client.db.updateSettings(message.guild.id, 'channel', channel.id);
      return await message.send(message.language.get('COMMAND_CHANNEL_SUCCESSFUL', channel.id));
    }
  }

};