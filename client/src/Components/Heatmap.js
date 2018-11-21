import React, { Component } from 'react';
import L from 'leaflet';
import './heatmap.css';
import axios from 'axios';
const moment = require('moment');
moment().format();
const markers = [];
const circles = [];

class Heatmap extends React.Component {
    constructor() {
        super()
        this.state = {
            startdate: moment(Date.now()).subtract(30, "days").format('YYYY-MM-DD'),
            startdateError: '',
            enddate: moment(Date.now()).format('YYYY-MM-DD'),
            enddateError: '',
            starttime: moment(Date.now()).subtract(2, "h").format("hh:mm A"),
            starttimeError: '',
            endtime: moment(Date.now()).format("hh:mm A"),
            endtimeError: '',
            searchStart: "",
            searchEnd: "",
        }
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createMap = this.createMap.bind(this);
        this.updateMapDate = this.updateMapDate.bind(this);
        this.updateMapTime = this.updateMapTime.bind(this);
        this.validate = this.validate.bind(this)
    }

    //Function to update the state as user types in textbox
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Function that runs when the user searches by date, first validating what they entered, then updating the map
    handleDateSubmit(event) {
        event.preventDefault();
        const err = this.validate();
        if (!err) {
            this.updateMapDate();
        }
    }

    //Function that runs when the user searches by time, first validating what they entered, then updating the map
    handleTimeSubmit(event) {
        event.preventDefault();
        const err = this.validate();
        if (!err) {
            this.updateMapTime();
        }
    }

    //Function that updates the map based on the dates the user is searching for
    updateMapDate() {
        //Removes previous markers/circles from the map
        for (let i = 0; i < markers.length; i++) {
            this.map.removeLayer(markers[i]);
            this.map.removeLayer(circles[i]);
        }
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        //Updates the text above the map informing the user what information is being displayed
        this.setState({
            searchStart: startdate,
            searchEnd: enddate
        })
        //Loops through each report within the date range and adds it to the map using its latitude and longitude
        axios.get(`/api/reportsdate/${startdate}/${enddate}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;
                console.log(response.data[i].comment)
                //Adds a marker indicating the incidents's location, along with the date and description
                let newMarker = L.marker([lat, long]).addTo(this.map).bindPopup(`<b>Date: ${response.data[i].date}</b><br>Description: ${response.data[i].comment}`).openPopup();
                markers.push(newMarker);
                let newCircle = L.circle([lat, long], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.1,
                    radius: 150
                }).addTo(this.map);
                circles.push(newCircle);
            }
        })
    }

    //Function that updates the map based on the time of day the user is searching for
    updateMapTime() {
        //Removes previous markers/circles from the map
        for (let i = 0; i < markers.length; i++) {
            this.map.removeLayer(markers[i]);
            this.map.removeLayer(circles[i])
        }
        const starttime = this.state.starttime;
        const endtime = this.state.endtime;
        //Updates the text above the map informing the user what information is being displayed
        this.setState({
            searchStart: starttime,
            searchEnd: endtime
        })
        //Loops through each report within the time range and adds it to the map using its latitude and longitude
        axios.get(`/api/reportstime/${starttime}/${endtime}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;
                let timeString = response.data[i].time;
                const hourEnd = timeString.indexOf(":");
                const H = +timeString.substr(0, hourEnd);
                const h = H % 12 || 12;
                const ampm = H < 12 ? " AM" : " PM";
                timeString = h + timeString.substr(hourEnd, 3) + ampm;

                //Adds a marker indicating the incidents's location, along with the time and description
                let newMarker = L.marker([lat, long]).addTo(this.map).bindPopup(`<b>Time: ${timeString}</b><br>Description: ${response.data[i].comment}`).openPopup();
                markers.push(newMarker);
                let newCircle = L.circle([lat, long], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.1,
                    radius: 150
                }).addTo(this.map);
                circles.push(newCircle);
            }
        })
    }

    //Function that runs when component loads, displaying incidents from the last 30 days be default
    createMap() {
        this.map = L.map('map', {
            center: [41.500, -81.700],
            zoom: 13,
            layers: [
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    //Uses mapbox for the tiled streetview
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1Ijoic3RldmVtYXphbmVjIiwiYSI6ImNqa2xmaWM5ZjBveXozd3BjemtmNzY4bmcifQ.S0cxoUekQHa6Pa9AkCk8Ig'
                }),
            ]
        });

        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        //Updates the text above the map informing the user what information is being displayed
        this.setState({
            searchStart: startdate,
            searchEnd: enddate
        })
        //Loops through each report within the last 30 days and adds it to the map using its latitude and longitude
        axios.get(`/api/reportsdate/${startdate}/${enddate}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;

                //Adds a marker indicating the incidents's location, along with the date and description
                let newMarker = L.marker([lat, long]).addTo(this.map).bindPopup(`<b>Date: ${response.data[i].date}</b><br>Description: ${response.data[i].comment}`).openPopup();
                markers.push(newMarker);
                let newCircle = L.circle([lat, long], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.1,
                    radius: 150
                }).addTo(this.map);
                circles.push(newCircle);
            }
        })
    }
    componentDidMount() {
        // create map
        this.createMap();
    }

    validate = () => {
        let isError = false;
        const errors = {}
        //Clear out previous error messages before checking for new errors
        if (isError === false) {
            this.setState({
                startdateError: "",
                enddateError: "",
                starttimeError: "",
                endtimeError: ""
            })

        }
        //Regex to check for YYYY-MM-DD format
        if (!this.state.startdate.match(/^\d{4}([./-])\d{2}([./-])\d{2}$/)) {
            isError = true;
            errors.startdateError = "Date must be entered in YYYY-MM-DD format"
        }
        //Regex to check for YYYY-MM-DD format
        if (!this.state.enddate.match(/^\d{4}([./-])\d{2}([./-])\d{2}$/)) {
            isError = true;
            errors.enddateError = "Date must be entered in YYYY-MM-DD format"
        }
        //Regex to check for hh:MM a format
        else if (!this.state.starttime.match(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/)) {
            isError = true;
            errors.starttimeError = "Time must be entered in HH:MM AM/PM format (i.e. 06:18 AM)"
        }
        //Regex to check for hh:MM a format
        else if (!this.state.starttime.match(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/)) {
            isError = true;
            errors.endtimeError = "Time must be entered in HH:MM AM/PM format (i.e. 06:18 AM)"
        }
        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            })
        }
        return isError
    }

    render() {
        const styles = {
            color: "red"
        }
        return <div id="mapContainer">
            <h4>Showing Close Calls Between {this.state.searchStart} and {this.state.searchEnd}</h4>
            <div id="map"></div>
            <div id="formContainer">
                <form id="dateForm">
                    <h3>Search by Date:</h3>
                    <div className="form-group">

                        <div className="col-4 col-mr-auto" >
                            {`Starting Date:  `}
                            <input className="form-input"
                                type="text"
                                id="startdate"
                                name="startdate"
                                placeholder="Starting Date"
                                value={this.state.startdate}
                                onChange={this.handleChange}
                            />
                        </div>
                        {this.state.startdateError.length > 1 ? (
                            <span style={styles}>{this.state.startdateError}</span>
                        ) : (
                                null
                            )}
                    </div>
                    <br />
                    <div className="form-group">

                        <div className="col-4 col-mr-auto" >
                            {`Ending Date:  `}
                            <input className="form-input"
                                type="text"
                                id="enddate"
                                name="enddate"
                                placeholder="Ending Date"
                                value={this.state.enddate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <span style={styles}>{this.state.enddateError}</span>
                    </div>
                    <br />
                    <div className="form-group ">
                        <div className="col-12"></div>
                        <button
                            className=" btn btn-primary signup-button "
                            onClick={this.handleDateSubmit}
                            type="submit"
                        >Search Dates</button>
                    </div>
                </form>
                <br />

                <form id="timeForm">
                    <h3>Search by Time of Day:</h3>
                    <div className="form-group">

                        <div className="col-4 col-mr-auto" >
                            {`Starting Time: `}
                            <input className="form-input"
                                type="text"
                                id="starttime"
                                name="starttime"
                                placeholder="Starting Time"
                                value={this.state.starttime}
                                onChange={this.handleChange}
                            />
                        </div>
                        <span style={styles}>{this.state.starttimeError}</span>
                    </div>
                    <br />
                    <div className="form-group">

                        <div className="col-4 col-mr-auto" >
                            {`Ending Time:   `}
                            <input className="form-input"
                                type="text"
                                id="endtime"
                                name="endtime"
                                placeholder="Ending Time"
                                value={this.state.endtime}
                                onChange={this.handleChange}
                            />
                        </div>
                        <span style={styles}>{this.state.endtimeError}</span>
                    </div>
                    <br />
                    <div className="form-group ">
                        <div className="col-12"></div>
                        <button
                            className=" btn btn-primary signup-button "
                            onClick={this.handleTimeSubmit}
                            type="submit"
                        >Search Times</button>
                    </div>
                </form>
            </div>
        </div>
    }
}


export default Heatmap;