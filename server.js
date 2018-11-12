const app = require('express')();
var bodyParser = require("body-parser");
var db = require("./models");
const PORT = process.env.PORT || 9000;
const reports = require('./routes/reports')
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use('/api', reports)
app.use(express.static(path.join(__dirname, "../build")))

var syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`);
    })
});

module.exports = app;