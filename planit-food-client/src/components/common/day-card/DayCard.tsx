import * as React from 'react';
import { Component, MouseEvent } from 'react';
import MealItem from '../meal-item/MealItem';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Recipe } from '../../../models/Recipes';
import { MealItem as MealItemModel, DayCard as DayCardModel } from '../../../models/DayCard';

import './DayCard.css';

interface DayCardProps {
    id: number;
    date?: Moment;
    mealList: Recipe[];
    allowEditing?: boolean;
    createMeal?: (meal: Recipe, id: number) => Promise<DayCardModel>;
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
                                key={meal.idRecipes + i.toString()}
                                allowEditing={!!this.props.allowEditing}
                                isEditing={meal.isPlaceholder}
                                id={i}
                                mealID={meal.idRecipes}
                                value={meal.recipeName}
                                onEditSubmit={this.onEditSubmit}
                                onDelete={this.removeMeal}
                            />
                        )}
                        {this.props.allowEditing && this.renderAddNewCardButton()}
                    </ul>
                </form>
            </div >
        );
    }

    private onEditSubmit = (newValue: string, mealID?: number) => mealID ?
        () => null : this.createMeal(newValue, this.props.id)

    private createMeal = (value: string, id: number) => {
        return this.props.createMeal && this.props.createMeal(
            {
                recipeName: value
            },
            id);
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
                recipeName: '',
                isPlaceholder: true
            })
        });
    }

    private removeMeal = (id: number) => {
        this.setState({
            mealList: this.state.mealList.filter((meal, i) => id !== i)
        });
    }
}

export default DayCard;