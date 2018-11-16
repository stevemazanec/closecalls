import React, { Component } from 'react';
import L from 'leaflet';
import './heatmap.css';
import axios from 'axios';
const moment = require('moment');
moment().format();
const markers = [];

class Heatmap extends React.Component {
    constructor() {
        super()
        this.state = {
            startdate: moment(Date.now()).subtract(30, "days").format('YYYY-MM-DD'),
            enddate: moment(Date.now()).format('YYYY-MM-DD'),
            starttime: moment(Date.now()).subtract(2, "h").format("h:mm A"),
            endtime: moment(Date.now()).format("h:mm A"),
            searchStart: "",
            searchEnd: "",
        }
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createMap = this.createMap.bind(this);
        this.updateMapDate = this.updateMapDate.bind(this);
        this.updateMapTime = this.updateMapTime.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleDateSubmit(event) {
        event.preventDefault()
        this.updateMapDate();
    }

    handleTimeSubmit(event) {
        event.preventDefault()
        this.updateMapTime();
    }


    updateMapDate() {
        for (let i = 0; i < markers.length; i++) {
            this.map.removeLayer(markers[i]);
        }
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        this.setState({
            searchStart: startdate,
            searchEnd: enddate
        })
        //Loops through each floorer and adds them to the map using their latitude and longitude
        axios.get(`/api/reportsdate/${startdate}/${enddate}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;

                //Adds a marker indicating the floorer's location, along with their name
                let newMarker = L.marker([lat, long]).addTo(this.map).bindPopup(`${response.data[i].date}`).openPopup();
                markers.push(newMarker);
                // this.marker = L.marker([lat, long]).addTo(this.map);
                // this.marker.bindPopup(`${response.data[i].date}`).openPopup();
            }
        })
    }

    updateMapTime() {
        for (let i = 0; i < markers.length; i++) {
            this.map.removeLayer(markers[i]);
        }
        const starttime = this.state.starttime;
        const endtime = this.state.endtime;
        this.setState({
            searchStart: starttime,
            searchEnd: endtime
        })
        //Loops through each floorer and adds them to the map using their latitude and longitude
        axios.get(`/api/reportstime/${starttime}/${endtime}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;
                let timeString = response.data[i].time;
                const hourEnd = timeString.indexOf(":");
                const H = +timeString.substr(0, hourEnd);
                const h = H % 12 || 12;
                const ampm = H < 12 ? "AM" : "PM";
                timeString = h + timeString.substr(hourEnd, 3) + ampm;

                //Adds a marker indicating the floorer's location, along with their name
                let newMarker = L.marker([lat, long]).addTo(this.map).bindPopup(`${timeString}`).openPopup();
                markers.push(newMarker);
                // this.marker = L.marker([lat, long]).addTo(this.map);
                // this.marker.bindPopup(`${response.data[i].time}`).openPopup();
            }
        })
    }

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
        this.setState({
            searchStart: startdate,
            searchEnd: enddate
        })
        //Loops through each floorer and adds them to the map using their latitude and longitude
        axios.get(`/api/reportsdate/${startdate}/${enddate}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;

                //Adds a marker indicating the floorer's location, along with their name
                let newMarker = L.marker([lat, long]).addTo(this.map).bindPopup(`${response.data[i].date}`).openPopup();
                markers.push(newMarker);
                // this.marker = L.marker([lat, long]).addTo(this.map);
                // this.marker.bindPopup(`${response.data[i].date}`).openPopup();
            }
        })
    }
    componentDidMount() {
        // create map
        this.createMap();
    }
    render() {

        return <div id="mapContainer">
            <h4>Showing Close Calls Between {this.state.searchStart} and {this.state.searchEnd}</h4>
            <div id="map"></div>
            <div id="formContainer">
                <form id="dateForm">
                    <h5>Search by Date:</h5>
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
                    <h5>Search by Time of Day:</h5>
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