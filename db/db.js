let admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./key")),
  databaseURL: "https://starboard-new.firebaseio.com"
});

let db = admin.firestore();

async function setupGuild(guildId, channelId) {
  return new Promise((resolve, reject) => {
    let guildRef = db.collection('guilds').doc(guildId);
    guildRef.set({
      channel: channelId,
      minimum: 4,
      emoji: '⭐',
      starred: {},
      members: {},
      blacklist: {users: [], channels: []}
    }).then(resolve).catch(reject);
  });
}

async function getGuild(guildId) {
  return new Promise((resolve, reject) => {
    let guildRef = db.collection('guilds').doc(guildId);
    guildRef.get().then(guild => {
      resolve(guild.data());
    }).catch(reject);
  });
}

async function updateSettings(guildId, setting, value) {
  return new Promise((resolve, reject) => {
    let guildRef = db.collection('guilds').doc(guildId);
    let settings = {};
    settings[setting] = value;
    guildRef.set(settings, { merge: true }).then(resolve).catch(reject);
  });
}

async function updateStar(guildId, messageId, data) {
  return new Promise((resolve, reject) => {
    let guildRef = db.collection('guilds').doc(guildId);
    let newData = {};
    newData[messageId] = data;
    guildRef.set({'starred': newData}, {merge: true}).then(resolve).catch(reject);
  });
}

async function removeStar(guildId, messageId) {
  return new Promise((resolve, reject) => {
    let guildRef = db.collection('guilds').doc(guildId);
    let data = {starred: {}};
    data.starred[messageId] = admin.firestore.FieldValue.delete();
    guildRef.set(data, {merge: true}).then(resolve).catch(reject);
  });
}

async function modifyStars(guildId, memberId, change) {
  return new Promise((resolve, reject) => {
    let guildRef = db.collection('guilds').doc(guildId);
    let data = {members: {}};
    data.members[memberId] = admin.firestore.FieldValue.increment(change);
    guildRef.set(data, {merge: true}).then(resolve).catch(reject);
  });
}

let addToArray = admin.firestore.FieldValue.arrayUnion,
    removeFromArray = admin.firestore.FieldValue.arrayRemove,
    increment = admin.firestore.FieldValue.increment;

module.exports = {setupGuild, getGuild, updateSettings, updateStar, removeStar, modifyStars, util: {addToArray, removeFromArray, increment}};