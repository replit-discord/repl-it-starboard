const { Language, util } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.language = {
			DEFAULT: (key) => `${key} has not been localized for en-US yet.`,
			DEFAULT_LANGUAGE: 'Default Language',
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `The prefix${Array.isArray(prefix) ?
				`es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(', ')}` :
				` in this guild is set to: \`${prefix}\``
			}`,
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
			RESOLVER_INVALID_BOOL: (name) => `${name} must be either \`true\` or \`false\`.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a valid channel tag or ID.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} must be a valid ${type}.`,
			RESOLVER_INVALID_DATE: (name) => `${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} must be a valid duration string.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild id.`,
			RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
			RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} must be a valid member (mention or ID) of this server.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} must be a valid message id.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regular expression pattern: \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} must be a valid role.`,
			RESOLVER_INVALID_STRING: (name) => `${name} must be a valid string.`,
			RESOLVER_INVALID_TIME: (name) => `${name} must be a valid duration or date string.`,
			RESOLVER_INVALID_URL: (name) => `${name} must be a valid url.`,
			RESOLVER_INVALID_USER: (name) => `${name} must be a valid user.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,
			REACTIONHANDLER_PROMPT: 'Which page would you like to jump to?',
			COMMANDMESSAGE_MISSING: 'Missing one or more required arguments after end of input.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `You need to provide a valid ${name} for this command to work.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Missing a required option: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Your option didn't match any of the possibilities: (${possibles})`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} \n> **${error}** \n> You have **${time}** seconds to respond to this prompt with a proper value.\n> Type \`${abortOptions.join('` OR `')}\` to cancel command execution.`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} \n> **${name}** is a repeating argument \n> You have **${time}** seconds to respond to this prompt with additional valid arguments.\n> Type \`${cancelOptions.join('` OR `')}\` to cancel command execution.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Command cancelled. ✅',
			INHIBITOR_COOLDOWN: (remaining) => `> You have just used this command.\n> You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
			INHIBITOR_DISABLED_GUILD: 'This command has been disabled by an admin in this guild.',
			INHIBITOR_DISABLED_GLOBAL: 'This command has been globally disabled by the bot owner.',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions.\nPlease provide me the following permissions to use this command: \`${missing}\``,
			INHIBITOR_NSFW: 'You can only use NSFW commands in NSFW channels.',
			INHIBITOR_PERMISSIONS: 'You do not have permission to use this command.',
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, and any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can use await, however, if you want to return something, you will need the return keyword.',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it will send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => new MessageEmbed()
				.setTitle('EVAL FAILED')
				.setColor('DARK_RED')
				.setTimestamp()
				.setFooter(time)
				.setThumbnail()
				.addFields([{name: 'TYPE',value: type}, {name: 'ERROR', value: output}]),
			COMMAND_EVAL_OUTPUT: (time, output, type) => new MessageEmbed()
				.setTitle('EVAL SUCCESSFUL')
				.setColor('NAVY')
				.setTimestamp()
				.setFooter(time)
				.setThumbnail()
				.addFields([
          {name: 'TYPE', value: type},
          {name: 'OUTPUT', value: output}
        ]),
			COMMAND_EVAL_SENDFILE: (time, type) => new MessageEmbed()
				.setTitle('EVAL SUCCESSFUL')
				.setColor('NAVY')
				.setTimestamp()
				.setFooter(time)
				.setThumbnail()
				.addFields([
          {name: 'TYPE', value: type},
          {name: 'OUTPUT', value: `Output was too long... sent the result as a file.`}
        ]),
			COMMAND_EVAL_SENDCONSOLE: (time, type) => new MessageEmbed()
				.setTitle('EVAL SUCCESSFUL')
				.setColor('NAVY')
				.setTimestamp()
				.setFooter(time)
				.setThumbnail()
				.addFields([
          {name: 'TYPE', value: type},
          {name: 'OUTPUT', value: `\`Output was too long... sent the result to console.`}
        ]),
			COMMAND_UNLOAD: (type, name) => `✅ Unloaded ${type}: ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads the klasa piece.',
			COMMAND_UNLOAD_WARN: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_TRANSFER_ERROR: '❌ That file has been transferred already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `✅ Successfully transferred ${type}: ${name}.`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder.',
			COMMAND_RELOAD: (type, name, time) => `✅ Reloaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_RELOAD_FAILED: (type, name) => `❌ Failed to reload ${type}: ${name}. Please check your Console.`,
			COMMAND_RELOAD_ALL: (type, time) => `✅ Reloaded all ${type}. (Took: ${time})`,
			COMMAND_RELOAD_EVERYTHING: (time) => `✅ Reloaded everything. (Took: ${time})`,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',
			COMMAND_LOAD: (time, type, name) => `✅ Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `❌ Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
			COMMAND_INVITE: () => [
				`To add ${this.client.user.username} to your discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					'I know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' '))
			],
			COMMAND_INVITE_DESCRIPTION: 'Displays the invite link of the bot, to invite it to your guild.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_DM: 'The list of commands you have access to has been sent to your DMs. ☑',
			COMMAND_HELP_NODM: 'You have DMs disabled, I couldn\'t send you the commands in DMs. :b:RUH',
			COMMAND_HELP_EXTENDED: 'Extended Help ::',
			COMMAND_STATS: (memUsage, uptime, users, guilds, channels, klasaVersion, discordVersion, processVersion, message) => [
				'= STATISTICS =',
				'',
				`• Mem Usage  :: ${memUsage} MB`,
				`• Uptime     :: ${uptime}`,
				`• Users      :: ${users}`,
				`• Guilds     :: ${guilds}`,
				`• Channels   :: ${channels}`,
				`• Klasa      :: v${klasaVersion}`,
				`• Discord.js :: v${discordVersion}`,
				`• Node.js    :: ${processVersion}`,
				`• Shard      :: ${(message.guild ? message.guild.shardID : 0) + 1} / ${this.client.options.shardCount}`
			],
			COMMAND_STATS_DESCRIPTION: 'Provides some details about the bot and stats.',
			MESSAGE_PROMPT_TIMEOUT: 'The command prompt has timed out.',
			TEXT_PROMPT_ABORT_OPTIONS: ['abort', 'stop', 'cancel'],

			COMMAND_SETUP_DESCRIPTION: 'Sets up the starboard feature for your server.',
			COMMAND_SETUP_EXTENDED: [
				'Sets up the database for usage of the starboard feature in your server.',
				'The channel to be used as starboard i.e. where the posts will be sent is the required argument.',
				'',
				'**NOTE :** This command is to be used only for setting up the server and not for changing the starboard channel. Using this command again will reset the database for your server.',	
				'',
				'__**EXAMPLES: -**__',
				'```' + `${this.client.options.prefix}setup #starboard` + '```'
			].join('\n'),
			COMMAND_SETUP_SUCCESSFUL: (g, c) => `The starboard is ready to be used in **${g}**. The starred messages will be posted in <#${c}>.`,
			COMMAND_CHANNEL_DESCRIPTION: 'Changes the channel to be used for starboard to the provided channel',
			COMMAND_CHANNEL_SUCCESSFUL: c => `The starboard channel has been set to <#${c}>.`,
			COMMAND_MINIMUM_DESCRIPTION: 'Changes the minimum number of reactions required for a message to be starred.',
      MINIMUM_TOO_LOW: 'The minmum number of stars has to be greater than or equal to 2.',
			COMMAND_MINIMUM_SUCCESSFUL: c => `The minimum number of required stars has been set to \`${c}\`.`,
			COMMAND_EMOJI_DESCRIPTION: 'Changes the the emoji to be considered as a `star`. Can only be used for a custom emoji.',
			COMMAND_EMOJI_SUCCESSFUL: c => `The new \`star\` has been set to ${c}.`,
			COMMAND_RESET_DESCRIPTION: 'Reset the emoji to the default star or reset the minimum number of required stars to 4.',
			COMMAND_RESET_SUCCESSFUL: (s, v) => `The **${s}** has been reset to **${v}** for this server,`,

			COMMAND_USER_INFO_DESCRIPTION: 'Displays brief details about a user.',
			COMMAND_SERVER_INFO_DESCRIPTION: 'Displays brief details about the server',
			COMMAND_LEADERBOARD_DESCRIPTION: 'Displays the leaderboard (aka list of people with most number of stars in the server).',
			NO_LEADERS: 'Sorry but there are no starred messages currently. Please star more messages.',

			NO_SETUP: `The server is not set up yet. Use ${this.client.options.prefix}setup or use \`${this.client.options.prefix}help setup\` for more info.`,

			GIVE_SUCCESS: (member, change) => `**${member.displayName}** has successfully been given \`${change}\` stars.`
		}
	}

	async init() {
		await super.init();
	}

};