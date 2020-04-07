require('dotenv').config();
const {Collection} = require('discord.js');

const express = require('express');
const app = express();
app.use(express.static('public'));

const { Client } = require('klasa');

Client.prototype.db = require('./db/db');
Client.prototype.cachedData = new Collection();

const config = new Object();
config.fetchAllMembers = true;
config.prefix = '*';
config.commandEditing = true;
config.commandLogging = true;
config.typing = true;
config.readyMessage = client => `Logged in as ${client.user.tag}`;
config.presence = {
  activity: {
    name: 'the STARBOARD',
    type: 'WATCHING'
  }
};
config.partials = ['REACTION', 'MESSAGE'];
config.createPiecesFolders = false;
config.ownerID = '374886124126208000';
config.disabledCorePieces = ['commands', 'languages'];

const bot = new Client(config);

bot.login(process.env.TOKEN).then(()=> {
  app.listen(3000, ()=> {
    bot.emit('log', 'Server ready.');
  });
});