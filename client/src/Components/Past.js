import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');
moment().format();

class Past extends Component {
    constructor() {
        super()
        this.state = {
            date: moment(),
            dateError: '',
            time: moment(Date.now()).format('HH:mm A'),
            address: "",
            addressError: "",
            comment: "",
            commentError: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        //   this.validate = this.validate.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
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
        axios.post('/api/pastreports/', {
            date: this.state.date,
            time: this.state.time,
            address: this.state.address,
            comment: this.state.comment
        })
        alert("Your report has been submitted");
        this.setState({
            dateError: "",
            date: "",
            time: "",
            addressError: "",
            address: "",
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
                <h3 className="signup-title">Past Incident Report</h3>
                <form>
                    <div className="form-group">
                        {`Date: `}
                        <div className="col-4 col-mr-auto" >
                            <DatePicker
                                dateFormat="YYYY/MM/DD"
                                selected={this.state.date}
                                onChange={this.handleDateChange}
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
                    </div>
                    <br></br>
                    <div className="form-group">
                        {`Address: `}
                        <div className="col-4 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address of Incident"
                                value={this.state.address}
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

export default Past;