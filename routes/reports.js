const express = require('express');
const router = express.Router();
const db = require("../models");
const NodeGeocoder = require("node-geocoder");

const options = {
    provider: "mapquest",
    httpAdapter: 'https',
    apiKey: process.env.MAPQUEST_KEY,
    formatter: null
};

const geocoder = NodeGeocoder(options);

function convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM' || modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    return hours + ':' + minutes;
}

//API routes will go here
router.post("/pastreports", function (req, res) {
    //Takes the address the user inputted and converts it to lattitude and longitude before passing it to the database
    geocoder.geocode(req.body.address, function (err, res) {
        const lat = res[0].latitude;
        const long = res[0].longitude;

        console.log(req.body);
        db.Report.create({
            date: req.body.date,
            time: req.body.time,
            latitude: lat,
            longitude: long,
            comment: req.body.comment
        });
    });
})

router.post("/recentreports", function (req, res) {
    const militaryTime = convertTime12to24(req.body.time);
    console.log(militaryTime);
    db.Report.create({
        date: req.body.date,
        time: militaryTime,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        comment: req.body.comment
    });
})

router.get("/reportsdate/:startdate/:enddate", function (req, res) {
    db.Report.findAll({
        where: {
            date: {
                "$between": [req.params.startdate, req.params.enddate]
            }
        }
    }).then(function (dbReports) {
        res.json(dbReports);
    });
});

router.get("/reportstime/:starttime/:endtime", function (req, res) {
    const searchStart = convertTime12to24(req.params.starttime);
    const searchEnd = convertTime12to24(req.params.endtime)
    db.Report.findAll({
        where: {
            time: {
                "$between": [searchStart, searchEnd]
            }
        }
    }).then(function (dbReports) {
        res.json(dbReports);
    });
});


module.exports = router;