import * as React from 'react';
import { Component } from 'react';
import Calendar from './Calendar';
import { compose } from 'react-apollo';
import { DayCard } from '../../models/DayCard';
import { ApiState, DATE_FORMAT } from '../../models/Api';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Recipe } from '../../models/Recipes';
import { CalendarContainerProps, calendarQueryVariables } from '../../models/Calendar';
import { addRecipeMutator, removeRecipeMutator } from '../../enhancers/recipe';
import { fetchDayCardsRange } from '../../enhancers/dayCard';

type CalendarState = ApiState<DayCard> & { date: Moment };

class CalendarContainer extends Component<CalendarContainerProps, CalendarState> {

    public constructor(props: CalendarContainerProps) {
        super(props);
        this.state = {
            data: props.data.getDayCards,
            error: props.data.error,
            loading: props.data.loading,
            date: moment()
        };
    }

    public componentWillReceiveProps(nextProps: CalendarContainerProps) {
        this.setState({
            data: nextProps.data.getDayCards,
            error: nextProps.data.error,
            loading: nextProps.data.loading
        });
    }

    public render() {
        return (
            <Calendar
                refetch={this.refetch}
                events={this.state.data && this.state.data.map((card) => ({
                    card,
                    title: card.recipes && card.recipes.length && card.recipes[0].recipeName || '',
                    allDay: true,
                    start: moment(card.date),
                    end: moment(card.date),
                    desc: ''
                }))}
                createRecipe={this.createRecipe}
                removeRecipe={this.removeRecipe}
            />
        );
    }

    private createRecipe = (refetchVariables: calendarQueryVariables) =>
        async (recipe: Recipe, date: Moment, id: number) => {
        const result = await this.props.addRecipeToCardWithData({
            newRecipe: recipe,
            date: moment(date).format(DATE_FORMAT),
            idDayCard: id
        });
        this.refetch(refetchVariables);
        return result.data.addRecipeToCard;
    }

    private removeRecipe = (refetchVariables: calendarQueryVariables) => async (recipeID: number, date: Moment) => {
        const result = await this.props.removeRecipeFromCardWithData({
            idRecipe: recipeID,
            date: moment(date).format(DATE_FORMAT)
        });
        if (result.data.removeRecipeFromCard) { this.refetch(refetchVariables); }
        return result.data.removeRecipeFromCard;
    }

    private refetch = (variables: calendarQueryVariables) => {
        this.props.data.refetch(variables).then((res) => this.setState({
            data: res.data.getDayCards,
            error: res.data.error,
            loading: res.data.loading
        }));
    }
}

export default compose(
    addRecipeMutator,
    removeRecipeMutator,
    fetchDayCardsRange,
)(CalendarContainer);
