import * as React from 'react';
import { Component, MouseEvent } from 'react';
import MealItem from '../meal-item/MealItem';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Recipe } from '../../../models/Recipes';
import { MealItem as MealItemModel } from '../../../models/DayCard';

import './DayCard.css';

interface DayCardProps {
    date?: Moment;
    mealList: Recipe[];
    allowEditing?: boolean;
}

interface DayCardState {
    mealList: MealItemModel[];
}

export const dayCardWidth = 320;

class DayCard extends Component<DayCardProps, DayCardState> {

    public constructor(props: DayCardProps) {
        super(props);
        this.state = {
            mealList: props.mealList
        };
    }

    public render() {
        return (
            <div className="day-card">
                <div className="day-card-date">
                    <div className="day">test</div>
                    <div className="date">{moment(this.props.date).format('ll')}</div>
                </div>
                <form className="meal-list">
                    <ul>
                        {this.state.mealList.map((meal, i) =>
                            <MealItem
                                key={meal.idRecipes || i}
                                allowEditing={!!this.props.allowEditing}
                                isEditing={meal.isPlaceholder}
                                id={i}
                                mealID={meal.idRecipes}
                                value={meal.recipeName}
                                onEditSubmit={(newValue: string) => null}
                                onDelete={this.removeMeal}
                            />
                        )}
                        {this.props.allowEditing && this.renderAddNewCardButton()}
                    </ul>
                </form>
            </div >
        );
    }

    private renderAddNewCardButton() {
        return (
            <li className="add-a-meal">
                <span>
                    <p>Add a new meal</p>
                    <button onClick={this.addAMeal}>+</button>
                </span>
            </li>
        );
    }

    private addAMeal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        return this.setState({
            mealList: this.state.mealList.concat({
                idRecipes: 'new-recipe',
                recipeName: '',
                isPlaceholder: true
            })
        });
    }

    private removeMeal = (id: number) => {
        // TODO Call server
        alert('meal removed');
    }
}

export default DayCard;