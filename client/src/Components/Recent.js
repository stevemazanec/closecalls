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
            dateError: '',
            time: moment(Date.now()).format('HH:mm'),
            latitude: "",
            longitude: "",
            comment: "",
            commentError: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.geoFindMe = this.geoFindMe.bind(this);
        //   this.validate = this.validate.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    geoFindMe = () => {
        if (!navigator.geolocation) {
            console.log("<p>Geolocation is not supported by your browser</p>");
            return;
        }

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
        this.geoFindMe();
    }


    // validate = () => {
    // 	let isError = false;
    // 	const errors = {}
    // 	if (this.state.username.length != 4) {
    // 		isError = true;
    // 		errors.usernameError = "Employee ID must be 4 digits in length"
    // 	}
    // 	else if (isNaN(this.state.username)) {
    // 		isError = true;
    // 		errors.usernameError = "You must enter numbers only"
    // 	}
    // 	else if (this.state.firstname.length < 1) {
    // 		isError = true;
    // 		errors.firstnameError = "You must enter a first name!"
    // 	}
    // 	else if (this.state.lastname.length < 1) {
    // 		isError = true;
    // 		errors.lastnameError = "You must enter a last name!"
    // 	}
    // 	if (isError) {
    // 		this.setState({
    // 			...this.state,
    // 			...errors
    // 		})
    // 	}
    // 	return isError
    // }

    handleSubmit(event) {
        event.preventDefault()
        //	const err = this.validate();
        //if (!err) {
        //request to server to add a new username/password
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
                            <span style={styles}>{this.state.dateError}</span>
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
                            <span style={styles}>{this.state.addressError}</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        {`Longitute: `}
                        <div className="col-4 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="longitude"
                                name="longitude"
                                placeholder="Longitude of Incident"
                                value={this.state.longitude}
                                onChange={this.handleChange}
                            />
                            <span style={styles}>{this.state.addressError}</span>
                        </div>
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
                            <span style={styles}>{this.state.commentError}</span>
                        </div>
                    </div>

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