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
  let ref = db.collection(coll).doc(key);
  ref.get().then(doc=>{
    if(!doc.exists) {
      ref.set(obj);
      return obj;
    }
    else {
      let data = doc.data();
      for (let x of Object.keys(obj)) {
        if (obj[x]) data[x] = obj[x];
      }
      ref.set(data, {merge: true});
      return data;
    }
  });
}

module.exports = {save, fetch, upsert};