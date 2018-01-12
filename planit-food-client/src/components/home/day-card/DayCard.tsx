import * as React from 'react';
import { Component } from 'react';

import './DayCard.css';
import MealItem from './MealItem';

interface DayCardProps {
    date?: Date;
    mealList: string[];
    isEditing?: boolean;
}

export const dayCardWidth = 320;

class DayCard extends Component<DayCardProps> {

    public render() {
        return (
            <div className="day-card">
                <div className="day-card-date">
                    <div className="day">test</div>
                    <div className="date">test2</div>
                </div>
                <form className="meal-list">
                    <ul>
                        {this.props.mealList.map((meal, i) =>
                            <MealItem
                                key={meal + i}
                                id={i}
                                value={meal}
                                onEditSubmit={(newValue: string) => null}
                                onDelete={(id) => null}
                            />
                        )}
                    </ul>
                </form>
            </div >
        );
    }
}

export default DayCard;