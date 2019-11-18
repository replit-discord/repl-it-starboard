const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'commands'],
      cooldown: 300000,
      ratelimit: 4,
      args: [
        {
          id: 'category',
          type: 'string',
          default: 'all'
        }
      ]
    });
  }

  exec(message, args) {
    let helpEmbed = new MessageEmbed()
      .setTitle('HELP MENU')
      .setColor('RANDOM')
      .setTimestamp()
      .setThumbnail(
        'https://cdn4.iconfinder.com/data/icons/colorful-design-basic-icons-1/550/question_doubt_red-512.png'
      );

    if (args.category === 'all') {
      helpEmbed
        .addField(
          '1. HELP',
          stripIndents(`This command can be used to get help on how to use the bot.

        Use \`${this.client['commandHandler'].prefix}help help\` for more info on how to use this command.`)
        )
        .addField(
          '2. SETUP',
          stripIndents(`This command can be used to setup and enable the starboard service in your server.

        Use \`${this.client['commandHandler'].prefix}help setup\` for more info on how to use this command.`)
        )
        .addField(
          '3. SETTINGS',
          stripIndents(`These commands can be used to customize how Starboard works in this server.

        Use \`${this.client['commandHandler'].prefix}help settings\` for more info on how to use this command.`)
        )
        .addField(
          '4. INFORMATION',
          stripIndents(`These commands can be used to view required info.

        Use \`${this.client['commandHandler'].prefix}help information\` to learn more about these commands`)
        );
    } else if (args.category === 'setup') {
      helpEmbed.addField(
        'SETUP',
        stripIndents`Use the \`${this.client['commandHandler'].prefix}setup\` command to set everything up for your server.

          __**FORMAT**__: \`${this.client['commandHandler'].prefix}setup <starboard-channel>\`
          __**EXAMPLE**__: \`${this.client['commandHandler'].prefix}setup #starboard\`
    
          This will enable the starboard facility in the server.
          **You need to be an admin to use setup!**`
      );
    } else if (args.category === 'settings' || args.category === 'setting' || args.category === 'set') {
      helpEmbed.addField(
        'SETTINGS',
        stripIndents`These commands can be used to modify your guild specific settings for the starboard.

          1. **minimum**: This command can be used to set the minimum stars requirement for the message to be starred.
          __**FORMAT:**__ \`${this.client['commandHandler'].prefix}minimum <number>\` OR \`${this.client['commandHandler'].prefix}min <number>\`
          __**EXAMPLE:**__ \`${this.client['commandHandler'].prefix}minimum 6\` OR \`${this.client['commandHandler'].prefix}min 6\`
          **By default, it is set to \`4\`.**
  
          2. **channel**: This command can be used to specify which channel to be used as the starboard.
          __**FORMAT:**__ \`${this.client['commandHandler'].prefix}channel <channel>\`
          __**EXAMPLE:**__ \`${this.client['commandHandler'].prefix}channel #announcements\`
          **The default value is provided along with \`setup\` command.**
  
          **You need to be an admin to use these commands!**`
      );
    } else if (args.category === 'info' || args.category === 'information') {
      helpEmbed.addField(
        'INFORMATION',
        stripIndents`These commands can be used to view various starboard related settings.
        
          1. **serverinfo**: This command can be used to display the current settings for the starboard.
          __**FORMAT:**__ \`${this.client['commandHandler'].prefix}serverinfo\`
  
          2. **invite**: This command sends a link to invite the bot to your server!
          __**FORMAT:**__ \`${this.client['commandHandler'].prefix}invite\`
  
          3. **website**: This command sends a link to the bot's website!
          __**FORMAT:**__ \`${this.client['commandHandler'].prefix}website\` OR \`${this.client['commandHandler'].prefix}web\` OR \`${this.client['commandHandler'].prefix}site\`
  
          4. **leaderboard**: This command can be used to display the server specific leaderboard.
          __**FORMAT:**__ \`${this.client['commandHandler'].prefix}leaderboard [page]\`
          __**EXAMPLES: -**__ 
          \`${this.client['commandHandler'].prefix}leaderboard\` (displays 1st page) 
          OR 
          \`${this.client['commandHandler'].prefix}leaderboard 3\` (displays 3rd page)
  
          **Anyone can use these commands!**`
      );
    } else if (args.category === 'help') {
      helpEmbed.addField(
        'HELP',
        stripIndents`You can use the \`help\` command to list all the available categories of commands or list all commands under the specified category.
          __**FORMAT**__: \`${this.client['commandHandler'].prefix}help [commands-category]\`
          
          If a category is provided, a list of all available commands under that category and their usage is shown.
          If a category is not provided, a list of all the categories is displayed.
          
          __**EXAMPLES**__: -
          \`${this.client['commandHandler'].prefix}help\`
          OR
          \`${this.client['commandHandler'].prefix}help info\`
          `
      );
    } else {
      helpEmbed.setColor('RED').setDescription('```INVALID CATEGORY```');
    }
    return message.channel.send(helpEmbed);
  }
};
