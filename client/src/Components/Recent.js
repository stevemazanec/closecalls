import React, { Component } from 'react';
import axios from 'axios';
const moment = require('moment');
moment().format();
let lat;
let long;

class Recent extends Component {
    constructor() {
        super()
        this.state = {
            date: moment(Date.now()).format('YYYY-MM-DD'),
            time: moment(Date.now()).format('HH:mm A'),
            latitude: "",
            latitudeError: "",
            longitude: "",
            longitudeError: "",
            comment: "",
            commentError: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.geoFindMe = this.geoFindMe.bind(this);
        this.validate = this.validate.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    //Function that grabs the users location from their device
    geoFindMe = () => {
        //If their device doesn't allow Geolocation, tell the user
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        //Once access is given to the user's information, update the latitude and longitude and display it in the form
        const success = (position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            this.setState({
                latitude: lat,
                longitude: long
            })
        }

        function error() {
            console.log("Unable to retrieve your location");
        }
        navigator.geolocation.getCurrentPosition(success, error);

    }

    componentDidMount() {
        //Once the component loads, grab the user's location
        this.geoFindMe();
    }


    validate = () => {
        let isError = false;
        const errors = {}
        //Clear out previous error messages before checking for new errors
        if (isError === false) {
            this.setState({
                timeError: "",
                latitudeError: "",
                longitudeError: "",
                commentError: ""
            })

        }
        //Regex to check for hh:MM a format
        if (!this.state.time.match(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/)) {
            isError = true;
            errors.timeError = "Time must be entered in HH:MM AM/PM format (i.e. 06:18 AM)"
        }
        //Only allow the user to submit if their latitude is within the Cleveland area
        else if (this.state.latitude > 41.6) {
            isError = true;
            errors.latitudeError = "You must enter a latitude in the Cleveland area"
        }
        //Only allow the user to submit if their latitude is within the Cleveland area
        else if (this.state.latitude < 41.4) {
            isError = true;
            errors.latitudeError = "You must enter a latitude in the Cleveland area"
        }
        //Only allow the user to submit if their longitude is within the Cleveland area
        else if (this.state.longtitude < -81.8) {
            isError = true;
            errors.longitudeError = "You must enter a longitude in the Cleveland area"
        }
        //Only allow the user to submit if their longitude is within the Cleveland area
        else if (this.state.longtitude > -81.6) {
            isError = true;
            errors.longitudeError = "You must enter a longitude in the Cleveland area"
        }
        //Don't let the user submit unless they have entered a comment
        else if (this.state.comment.length < 1) {
            isError = true;
            errors.commentError = "Please enter a brief description of the incident"
        }
        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            })
        }
        return isError
    }

    handleSubmit(event) {
        event.preventDefault()
        const err = this.validate();
        if (!err) {
            //request to server to add a new report to the database
            axios.post('/api/recentreports/', {
                date: moment(this.state.date, 'YYYY-MM-DD'),
                time: this.state.time,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                comment: this.state.comment
            })
            alert("Your report has been submitted");
            this.setState({
                dateError: "",
                date: "",
                time: "",
                commentError: "",
                comment: "",
            })
        }
    }



    render() {
        const styles = {
            color: "red"
        }
        return (
            <div>
                <div id="out"></div>
                <h3 className="signup-title">Recent Incident Report</h3>
                <form>
                    <div className="form-group">
                        {`Date: `}
                        <div className="col-4 col-mr-auto" >
                            <input className="form-input"
                                type="text"
                                id="date"
                                name="date"
                                placeholder="Incident Date"
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        {`Time: `}
                        <div className="col-4 col-mr-auto" >
                            <input className="form-input"
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Incident Time"
                                value={this.state.time}
                                onChange={this.handleChange}
                            />
                        </div>
                        <span style={styles}>{this.state.timeError}</span>
                    </div>
                    <br></br>
                    <div className="form-group">
                        {`Latitude: `}
                        <div className="col-4 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="latitude"
                                name="latitude"
                                placeholder="Latitude of Incident"
                                value={this.state.latitude}
                                onChange={this.handleChange}
                            />

                        </div>
                        <span style={styles}>{this.state.latitudeError}</span>
                    </div>
                    <br></br>
                    <div className="form-group">
                        {`Longitude: `}
                        <div className="col-4 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="longitude"
                                name="longitude"
                                placeholder="Longitude of Incident"
                                value={this.state.longitude}
                                onChange={this.handleChange}
                            />
                        </div>
                        <span style={styles}>{this.state.longitudeError}</span>
                    </div>
                    <br></br>
                    <div className="form-group">
                        {`Description: `}
                        <div>
                            <textarea
                                type="text"
                                id="comment"
                                name="comment"
                                placeholder="Describe the Incident"
                                value={this.state.comment}
                                onChange={this.handleChange}
                                rows="6"
                            />
                        </div>
                        <span style={styles}>{this.state.commentError}</span>
                    </div>
                    <br />
                    <div className="form-group ">
                        <div className="col-12"></div>
                        <button
                            className=" btn btn-primary signup-button "
                            onClick={this.handleSubmit}
                            type="submit"
                        >Submit Report</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default Recent;