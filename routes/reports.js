var db = require("../models");
var NodeGeocoder = require("node-geocoder");

var options = {
    provider: "mapquest",
    httpAdapter: 'https',
    apiKey: process.env.MAPQUEST_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

module.exports = function (app) {
    //API routes will go here
}