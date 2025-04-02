const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;
const db = process.env.MONGO_URL;

mongoose.connect(db).then(() => console.log("Prisijungta prie MongoDB"));

app.listen(port, () => console.log(`Serveris veikia ant ${port}`));