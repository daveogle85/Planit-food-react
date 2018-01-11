import * as React from 'react';
import { Component } from 'react';

import './DayCard.css';

interface DayCardProps {
    date?: Date;
    mealList?: string[];
}

class DayCard extends Component<DayCardProps> {

    public render() {
        return (
            <div className="day-card">
                <div className="day-card-date">
                    <div className="day">test</div>
                    <div className="date">test2</div>
                </div>
                <div className="meal-list">
                    <ul>
                        <li>test3</li>
                    </ul>
                </div>
            </div >
        );
    }
}

export default DayCard;