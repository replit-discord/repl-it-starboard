require('dotenv').config();

const express = require('express');
const app = express();
require('./bot/bot');

app.use(express.static('public'));
app.listen(3000);
