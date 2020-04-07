const { Command, Stopwatch, Type, util } = require('klasa');
const { inspect } = require('util');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['give'],
      permissionLevel: 7,
      guarded: true,
      description: language => language.get('COMMAND_GIVE_DESCRIPTION'),
      usage: '<user:member> <change:number>',
      usageDelim: ' '
    });
  }

  async run(message, [member, change]) {
    await this.client.db.modifyStars(message.guild.id, member.id, change);
    return await message.send(message.language.get('GIVE_SUCCESS', member, change));
  }

};
