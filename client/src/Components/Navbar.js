import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return <header>
            <div>
                <ul>
                    <li className="nav-item">
                        <Link
                            to="/"
                            className={
                                window.location.pathname === "/" ? "nav-link active" : "nav-link"
                            }
                        >
                            Home
      </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/recent"
                            className={
                                window.location.pathname === "/recent" ? "nav-link active" : "nav-link"
                            }
                        >
                            Recent Incident
      </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/past"
                            className={
                                window.location.pathname === "/past" ? "nav-link active" : "nav-link"
                            }
                        >
                            Past Incident
      </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/incidentmap"
                            className={
                                window.location.pathname === "/incidentmap" ? "nav-link active" : "nav-link"
                            }
                        >
                            Incident Map
      </Link>
                    </li>

                </ul>
                <hr />
            </div>
        </header>
    }
}

export default Navbar;