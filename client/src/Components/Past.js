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
            time: moment(Date.now()).format('hh:mm A'),
            timeError: '',
            address: "",
            addressError: "",
            comment: "",
            commentError: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.validate = this.validate.bind(this)
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

    validate = () => {
        let isError = false;
        const errors = {}
        //Clear out previous error messages before checking for new errors
        if (isError === false) {
            this.setState({
                timeError: "",
                addressError: "",
                commentError: ""
            })

        }
        //Regex to check for hh:MM a format
        if (!this.state.time.match(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/)) {
            isError = true;
            errors.timeError = "Time must be entered in HH:MM AM/PM format"
        }
        else if (this.state.address.length < 1) {
            isError = true;
            errors.addressError = "You must enter the nearest address"
        }
        else if (this.state.address.length < 10) {
            isError = true;
            errors.addressError = "You must enter the full address"
        }
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
            //request to server to add a new username/password
            axios.post('/api/pastreports/', {
                date: this.state.date,
                time: this.state.time,
                address: this.state.address,
                comment: this.state.comment
            })
            alert("Your report has been submitted");
            this.setState({
                date: "",
                time: "",
                addressError: "",
                address: "",
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
                        <span style={styles}>{this.state.timeError}</span>
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

                        </div>
                        <span style={styles}>{this.state.addressError}</span>
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

export default Past;