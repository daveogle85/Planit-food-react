import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    public render() {
        return (
            <div className="Home">
                <h2>Welcome to React</h2>
                <ul>
                    <li>
                        <Link to={`/calendar`}>
                            Go to calendar
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;