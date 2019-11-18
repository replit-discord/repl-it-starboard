const admin = require('firebase-admin');
const serviceKey = require('./key');

admin.initializeApp({
  credential: admin.credential.cert(serviceKey)
});

let db = admin.firestore();

async function save(coll, key, obj) {
  return new Promise((resolve, reject) => {
    let ref = db.collection(coll).doc(key);
    ref.set(obj).then(resolve).catch(reject);
  });
}

async function fetch(coll, key) {
  return new Promise((resolve, reject) => {
    let ref = db.collection(coll).doc(key);
    ref.get().then(o => {
      if (!o.exists)
        reject('Doesn\'t exist');
      else
        resolve(o.data());
    }).catch(reject);
  });
}

async function upsert(coll, key, obj) {
  return new Promise((resolve, reject) => {
    let ref = db.collection(coll).doc(key);
    ref.set(obj, { merge: true }).then(() => {
      ref.get().then(resolve);
    });
  });
}

module.exports = {save, fetch, upsert};