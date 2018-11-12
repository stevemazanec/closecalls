import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return <header>
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
                        to="/heatmap"
                        className={
                            window.location.pathname === "/heatmap" ? "nav-link active" : "nav-link"
                        }
                    >
                        Heatmap
      </Link>
                </li>

            </ul>
        </header>
    }
}

export default Navbar;