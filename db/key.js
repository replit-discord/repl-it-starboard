module.exports = {
  "type": "service_account",
  "project_id": "starboard-1660e",
  "private_key_id": process.env.DBKEY,
  "private_key": `-----BEGIN PRIVATE KEY-----\n${process.env.keyFull.replace(/ /g, '\n')}\n-----END PRIVATE KEY-----\n`,
  "client_email": "starboard-1660e@appspot.gserviceaccount.com",
  "client_id": "100660839397308159276",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/starboard-1660e%40appspot.gserviceaccount.com"
};
