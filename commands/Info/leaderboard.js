const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['l', 'leaders'],
      guarded: true,
      description: language => language.get('COMMAND_LEADERBOARD_DESCRIPTION'),
      runIn: ['text'],
      usage: '[page:number]'
    });

    this.handlers = new Map();
  }

  async run(message, [page]) {
    let msg = await message.send('', {embed: {description: 'Loading leaderboard'}});
    let guildData = await this.client.db.getGuild(message.guild.id);
    if (!guildData)
      return await message.sendLocale('NO_SETUP');
    else {
      let leaders = [];
      Object.keys(guildData.members).forEach(id => {
        if (guildData.members[id] > 0) {
          let data = {};
          data[(message.guild.members.cache.get(id) ?  message.guild.members.cache.get(id).displayName : `<${id}>`)] = guildData.members[id];
          leaders.push(data);
        }
      });

      let leaderboard = new RichDisplay();
      leaderboard.setFooterPrefix('Page ');

      leaders.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
      let pages = Math.ceil(leaders.length / 7);

      if (pages === 0)
        return await message.sendLocale('NO_LEADERS');
      else {
        for (let i = 0; i < pages; i++)
          leaderboard.addPage(e => {
            e.setColor('GOLD').setTimestamp().setThumbnail('https://cdn2.iconfinder.com/data/icons/flat-game-ui-buttons-icons-1/512/19-512.png');
            for (let j = 0; j < 7; j++) {
              if (((i * 7) + j + 1) <= leaders.length)
                e.addField(`RANK ${(i * 7) + j + 1}`, `__${Object.keys(leaders[(i * 7) + j])[0]}__ **(${Object.values(leaders[(i * 7) + j])[0]} \\\⭐)**`);
              else
                break;
            }
            return e;
          });

        let handler = await leaderboard.run(msg, {
          filter: (reaction, user) => user.id === message.author.id,
          firstLast: false,
          startPage: page ? (page - 1) : 0
        });

        handler.removeAllListeners('end');
        handler.on('end', () => {
          this.handlers.delete(message.author.id);
          message.delete();
          msg.delete();
        });
        this.handlers.set(message.author.id, handler);
        return handler;
      }
    }
  }
};
