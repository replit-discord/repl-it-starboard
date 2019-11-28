const Command = require('../../core');
const { MessageEmbed } = require('discord.js');
const db = require('../../../db/database');

module.exports = class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval', 'e'],
      ownerOnly: true,
      description:
        "Evaluates the given piece of code with respect to the bot's source and displays the output. Only usable by the bot owner."
    });
  }

  exec(message, args) {
    let code = message.content
      .split(' ')
      .slice(1)
      .join(' ');
    let e = new MessageEmbed()
      .setTitle('Eval')
      .setTimestamp()
      .setThumbnail(this.client.user.displayAvatarURL());
    let evaluated;
    try {
      evaluated = eval(code);
      let t = typeof evaluated;
      if (typeof evaluated !== 'string') evaluated = require('util').inspect(evaluated);
      else
        evaluated = evaluated
          .replace(/`/g, '`' + String.fromCharCode(8203))
          .replace(/@/g, '@' + String.fromCharCode(8203));

      e.setColor('GREEN')
        .setFooter('SUCCESS')
        .addField('Type', `\`\`\`css\n${t}\`\`\``)
        .addField('Output', `\`\`\`js\n${evaluated}\`\`\``);
      return message.channel.send(e);
    } catch (err) {
      e.setColor('RED')
        .addField('message', `\`\`\`css\n${err.message}\`\`\``)
        .addField('stackTrace', `\`\`\`js\n${err.stack}\`\`\``);
      return message.channel.send(e);
    }
  }
};
