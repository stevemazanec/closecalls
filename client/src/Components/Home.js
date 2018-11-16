import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return <div>
            <h1>
                Welcome to Close Calls
        </h1>
            <p>
                Close calls exists to help reduce bicycle accidents in Cleveland. We do this by logging the near-misses cyclists have, instead of waiting for accidents to happen.
                 If you've had a close call in the last few minutes, use the recent incidents tab at the top of the screen to report the incident. If you've had a close call in the
                 near past, use the past incident tab. If you want to learn more about where these near misses are happening, you can do so by viewing the incident map.
        </p>
            <div className="row">
                <div className="col-md-12 incident">
                    <Link
                        to="/recent"
                        className="homebox"
                    >
                        Recent Incident
      </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 incident">
                    <Link
                        to="/past"
                        className="homebox"
                    >
                        Past Incident
      </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 incident" >
                    <Link
                        to="/incidentmap"
                        className="homebox"
                    >
                        Incident Map
      </Link>
                </div>
            </div>
        </div>
    }
}

export default Home;