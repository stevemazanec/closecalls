import React, { Component } from 'react';
import L from 'leaflet';
import './heatmap.css'

class Heatmap extends React.Component {
    componentDidMount() {
        // create map
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
    }
    render() {
        return <div id="mapContainer">
            <div id="map"></div>
        </div>
    }
}


export default Heatmap;