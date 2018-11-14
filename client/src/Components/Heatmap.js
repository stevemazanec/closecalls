import React, { Component } from 'react';
import L from 'leaflet';
import './heatmap.css';
import axios from 'axios';
const moment = require('moment');
moment().format();
let marker;
let mymap;

class Heatmap extends React.Component {
    constructor() {
        super()
        this.state = {
            startdate: moment(Date.now()).subtract(30, "days").format('YYYY-MM-DD'),
            enddate: moment(Date.now()).format('YYYY-MM-DD'),
        }
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createMap = this.createMap.bind(this);
        this.updateMapDate = this.updateMapDate.bind(this);
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


    updateMapDate() {
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        //Loops through each floorer and adds them to the map using their latitude and longitude
        axios.get(`/api/reports/${startdate}/${enddate}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;

                //Adds a marker indicating the floorer's location, along with their name
                marker = L.marker([lat, long]).addTo(mymap);
                marker.bindPopup(`${response.data[i].date}`).openPopup();
            }
        })
    }

    createMap() {
        mymap = this.map = L.map('map', {
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
        //Loops through each floorer and adds them to the map using their latitude and longitude
        axios.get(`/api/reports/${startdate}/${enddate}`).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                const lat = response.data[i].latitude;
                const long = response.data[i].longitude;

                //Adds a marker indicating the floorer's location, along with their name
                marker = L.marker([lat, long]).addTo(mymap);
                marker.bindPopup(`${response.data[i].date}`).openPopup();
            }
        })
    }
    componentDidMount() {
        // create map


        this.createMap();
    }
    render() {

        return <div id="mapContainer">
            <div><h5>Search by Date:</h5>
                <form>
                    <div className="form-group">

                        <div className="col-4 col-mr-auto" >
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
                    <div className="form-group">

                        <div className="col-4 col-mr-auto" >
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
            </div>
            <div id="map"></div>
        </div>
    }
}


export default Heatmap;