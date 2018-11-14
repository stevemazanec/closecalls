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


//API routes will go here
router.post("/reports", function (req, res) {
    //Takes the address the user inputted and converts it to lattitude and longitude before passing it to the database
    geocoder.geocode(req.body.address, function (err, res) {
        const lat = res[0].latitude;
        const long = res[0].longitude;


        console.log(req.body);
        db.Report.create({
            date: req.body.date,
            address: req.body.address,
            latitude: lat,
            longitude: long,
            comment: req.body.comment
        });
    });
})

router.get("/reports/:startdate/:enddate", function (req, res) {
    console.log(`Start date ${req.params.startdate}`)
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


module.exports = router;