const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: language => language.get('COMMAND_SETUP_DESCRIPTION'),
      usage: '<channel:channel>',
			runIn: ['text'],
			permissionLevel: 6,
			extendedHelp: language => language.get('COMMAND_SETUP_EXTENDED'),
			promptLimit: 3
		});
	}

	async run(message, [channel]) {
    let guild = await this.client.db.setupGuild(message.guild.id, channel.id);
    return await message.send(message.language.get('COMMAND_SETUP_SUCCESSFUL', message.guild.name, channel.id));
	}

};