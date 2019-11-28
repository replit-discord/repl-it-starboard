const { Command } = require('discord-akairo');

module.exports = class StarboardCommand extends Command {
  constructor(
    id,
    {
      aliases = [],
      args = [],
      cooldown = null,
      channel = null,
      ratelimit = 1,
      description = '',
      userPermissions = null,
      clientPermissions = null,
      details = '',
      examples = [],
      icon,
      argumentDetails = [],
      ownerOnly = false
    }
  ) {
    super(id, {
      aliases,
      cooldown,
      ratelimit,
      description,
      userPermissions,
      clientPermissions,
      args,
      channel,
      ownerOnly
    });
    this.format = `${aliases[0]} ${argumentDetails
      .map(x => `${x.required ? '<' : '['}${x.name}${x.required ? '>' : ']'}`)
      .join(' ')}`;
    this.argumentDetails = argumentDetails;
    this.details = details;
    this.examples = examples;
    this.icon = icon;
  }
};
