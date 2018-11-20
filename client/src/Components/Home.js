import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return <div>
            <h1>
                Welcome to Close Calls
        </h1>
            <div id="introduction">
                <p>
                    Close calls exists to help reduce bicycle accidents in Cleveland.
                    We do this by logging the near-misses cyclists have, instead of waiting for accidents to happen.
                    If you've had a close call in the last few minutes, use the recent incidents tab at the top of the
                    screen to report the incident. If you've had a close call in the near past,
                    use the past incident tab. A copy of your report will be sent to the city,
                    and if you would like you can have it emailed to yourself as well.
                    If you want to learn more about where these near misses are happening,
                    you can do so by viewing the incident map.
        </p>
            </div>
            <div className="row">

                <Link
                    to="/recent"
                    className="homebox"
                >
                    <div className="col-md-12 incident" id="recentincident">
                        <span ><h3 className="incidentText">Recent Incident</h3></span>
                    </div>
                </Link>

            </div>

            <div className="row">

                <Link
                    to="/past"
                    className="homebox"
                >
                    <div className="col-md-12 incident" id="pastincident">
                        <h3 className="incidentText">Past Incident</h3>
                    </div>
                </Link>

            </div>
            <div className="row">

                <Link
                    to="/incidentmap"
                    className="homebox"
                >
                    <div className="col-md-12 incident" id="incidentmap" >
                        <h3 className="incidentText">Incident Map</h3>
                    </div>
                </Link>

            </div>
        </div>
    }
}

export default Home;