const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = 8000;
require('dotenv').config();

const apiRoutes = require('./src/modules/routes/routes');

app.use(cors());

const url = process.env.URL;
mongoose.connect(url, { useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/', apiRoutes)

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
