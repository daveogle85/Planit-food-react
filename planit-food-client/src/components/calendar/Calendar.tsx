import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import './Calendar.scss';

class CalendarPage extends Component {
    public render() {
        return (
        <div>
            <Link to={`/`}>
                Go to Home
            </Link>
        </div>
        );
    }
}

export default CalendarPage;