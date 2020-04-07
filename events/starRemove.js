const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			name: 'starRemove',
			event: 'messageReactionRemove',
			emitter: 'client'
		});
	}

	async run(react, user) {
		let reaction = react.partial ? await react.fetch() : react;
		let msg = reaction.message.partial
			? await reaction.message.fetch()
			: reaction.message;
		if (msg.guild) {
			if (!this.client.cachedData.get(msg.guild.id))
				this.client.cachedData.set(
					msg.guild.id,
					await this.client.db.getGuild(msg.guild.id).catch(console.error)
				);
			let guildData = this.client.cachedData.get(msg.guild.id);
			if (guildData) {
				if (msg.guild.channels.cache.has(guildData.channel)) {
					if (Object.keys(guildData.starred).includes(msg.id)) {
						let stars = (await reaction.users.fetch())
							.filter(u => u.id !== msg.author.id)
							.map(v => v.id);
						let message = await msg.guild.channels.cache
							.get(guildData.channel)
							.messages.fetch(guildData.starred[msg.id].embedId)
							.catch(console.error);
						if (message) {
							let embed = new MessageEmbed()
								.setTitle('View Message')
								.addField('Author', msg.author, true)
								.addField('Channel', msg.channel, true)
								.setTimestamp(msg.editedTimestamp || msg.createdTimestamp)
								.setThumbnail(msg.author.displayAvatarURL())
								.setColor('YELLOW')
								.setURL(msg.url)
								.setFooter(`${stars.length} stars ( ${reaction.emoji} )`);

							if (msg.content) embed.addField('Content', msg.content);
							if (msg.attachments.size > 0)
								embed.setImage(msg.attachments.first().url);

							let data = {
								stars: this.client.db.util.removeFromArray(user.id)
							};

							let temp = guildData.starred[msg.id].stars;
							temp.push(...stars);
							temp.slice(temp.indexOf(user.id), 1);
							guildData.starred[msg.id].stars = [...new Set(temp)];
							guildData.members[msg.author.id] -= 1;
							this.client.cachedData.set(msg.guild.id, guildData);

							await message.edit(embed);
							await this.client.db.updateStar(msg.guild.id, msg.id, data);
							await this.client.db.modifyStars(msg.guild.id, msg.author.id, -1);
						}
					}
				}
			}
		}
	}
};
