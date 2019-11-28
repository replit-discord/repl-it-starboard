const Command = require('../../core');
const { MessageEmbed } = require('discord.js');
// const { stripIndents } = require('common-tags');

module.exports = class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'commands'],
      cooldown: 300000,
      description: "Displays information on how to use (the bot / one of the bot's command)",
      details:
        'Lists a list of all commands grouped by categories, if a specific command is provided, more details about that specific command are displayed.',
      ratelimit: 4,
      args: [
        {
          id: 'command',
          type: 'string',
          default: 'all'
        }
      ],
      argumentDetails: [
        { name: 'command', required: false, description: 'The name of the command you want to know about.' }
      ],
      examples: ['help', 'command setup']
    });
  }

  exec(message, { command }) {
    const handler = this.client['commandHandler'];
    let helpEmbed = new MessageEmbed()
      .setTitle('HELP MENU')
      .setColor(0x09eb09)
      .setTimestamp()
      .setThumbnail(
        'https://cdn4.iconfinder.com/data/icons/colorful-design-basic-icons-1/550/question_doubt_red-512.png'
      )
      .setFooter(
        `Requested by ${message.member ? message.member.displayName : message.author.username}`,
        message.author.avatarURL()
      );

    if (command === 'all') {
      handler.categories.forEach((category, cId) => {
        helpEmbed.setDescription(
          `All the public commands of the bot are listed below. You can use \`${handler.prefix}help [command]\` to view more info on that command.`
        );
        if (cId !== 'Bot Management')
          helpEmbed.addField(
            cId,
            category
              .array()
              .map(c => `\`${handler.prefix}${c.id}:\` ${c.description}`)
              .join('\n')
          );
      });
    } else {
      let cmd = handler.findCommand(command);
      if (!cmd || cmd.categoryID === 'Bot Management') {
        helpEmbed
          .setColor('RED')
          .setDescription(
            `No command named \`${command}\` found. Please make sure you provide a valid command name. You can use \`${handler.prefix}help\` to list all valid commands!`
          );
      } else {
        helpEmbed
          .addField('Details', cmd.details || cmd.description)
          .addField('Format', `\`${handler.prefix}${cmd.format}\``);
        if (cmd.argumentDetails.length > 0)
          helpEmbed.addField('Arguments', cmd.argumentDetails.map(c => `\`${c.name}\`: ${c.description}`).join('\n'));
        if (cmd.examples.length > 0)
          helpEmbed.addField('Examples', cmd.examples.map(x => `\`\`\`${handler.prefix}${x}\`\`\``).join(' '));
        if (cmd.icon) helpEmbed.setThumbnail(cmd.icon);
      }
    }

    return message.channel.send(helpEmbed);
  }
};
