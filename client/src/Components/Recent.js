import React, { Component } from 'react';
import axios from 'axios';

class Recent extends Component {
    constructor() {
        super()
        this.state = {
            date: '',
            dateError: '',
            time: '',
            timeError: "",
            location: "",
            locationError: "",
            comment: "",
            commentError: '',

        }
        //  this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        //   this.validate = this.validate.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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

    // handleSubmit(event) {
    // 	event.preventDefault()
    // 	const err = this.validate();

    // 	if (!err) {
    // 		//request to server to add a new username/password
    // 		axios.post('/api/user/', {
    // 			username: this.state.username,
    // 			password: this.state.password,
    // 			rolename: this.state.rolename,
    // 			firstname: this.state.firstname,
    // 			lastname: this.state.lastname
    // 		})
    // 			.then(response => {
    // 				console.log(response)
    // 				if (!response.data.error) {
    // 					alert("New user successfully created")
    // 					this.setState({
    // 						usernameError: "",
    // 						username: "",
    // 						firstnameError: "",
    // 						firstname: "",
    // 						lastnameError: "",
    // 						lastname: "",
    // 					})
    // 				} else {
    // 					this.duplicateName();
    // 				}
    // 			}).catch(error => {
    // 				console.log('signup error: ')
    // 				console.log(error)

    // 			})
    // 	}
    // }



    render() {
        const styles = {
            color: "red"
        }
        return (
            <div>
                <h3 className="signup-title">Recent Incident Report</h3>
                <form>
                    <div className="form-group">

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
                        <div className="col-4 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Time of Day"
                                value={this.state.time}
                                onChange={this.handleChange}
                            />
                            <span style={styles}>{this.state.timeError}</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div className="col-4 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Location of Incident"
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                            <span style={styles}>{this.state.locationError}</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div>
                            <textarea
                                type="text"
                                id="comment"
                                name="comment"
                                placeholder="Describe the Incident"
                                value={this.state.location}
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