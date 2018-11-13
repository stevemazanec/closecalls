const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const db = require("./models");
const PORT = process.env.PORT || 9000;
const reports = require('./routes/reports');
const path = require("path");
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use('/api', reports)
app.use(express.static(path.join(__dirname, "../build")))

const syncOptions = { force: true };

db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`);
    })
});

module.exports = app;