const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['min'],
      description: language => language.get('COMMAND_MINIMUM_DESCRIPTION'),
      usage: '<number:number>',
      runIn: ['text'],
      permissionLevel: 6,
      promptLimit: 3
    });
  }

  async run(message, [n]) {
    if (!(await this.client.db.getGuild(message.guild.id)))
      return await message.sendLocale('NO_SETUP');
    else {
      if (n > 1) {
        await this.client.db.updateSettings(message.guild.id, 'minimum', n);
        return await message.send(message.language.get('COMMAND_MINIMUM_SUCCESSFUL', n));
      }
      else
        return await message.send(message.language.get('MINIMUM_TOO_LOW'));
    }
  }

};