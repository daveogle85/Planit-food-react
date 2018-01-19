import * as React from 'react';
import { Component } from 'react';
import Calendar from './Calendar';
import { compose } from 'react-apollo';
import { DayCard } from '../../models/DayCard';
import { ApiState } from '../../models/Api';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Recipe } from '../../models/Recipes';
import { CalendarContainerProps, queryVariables } from '../../models/Calendar';
import { addRecipeMutator, removeRecipeMutator } from '../../enhancers/recipe';
import { fetchDayCardsRange, addDayCardMutator } from '../../enhancers/dayCard';

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

    // private createDayCard = (refetchVariables: queryVariables) => async (recipe: Recipe, date: Moment) => {
    //     const result = await this.props.addDayCardWithData({
    //         newRecipe: recipe,
    //         date: date
    //     })
    //     this.refetch(refetchVariables);
    //     return result.data.addDayCard;
    // }

    private createRecipe = (refetchVariables: queryVariables) => async (recipe: Recipe, id: number) => {
        const result = await this.props.addRecipeToCardWithData({
            newRecipe: recipe,
            idDayCard: id
        });
        this.refetch(refetchVariables);
        return result.data.addRecipeToCard;
    }

    private removeRecipe = (refetchVariables: queryVariables) => async (recipeID: number, cardId: number) => {
        const result = await this.props.removeRecipeFromCardWithData({
            idRecipe: recipeID,
            idDayCard: cardId
        });
        if (result.data.removeRecipeFromCard) { this.refetch(refetchVariables); }
        return result.data.removeRecipeFromCard;
    }

    private refetch = (variables: queryVariables) => {
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
    addDayCardMutator,
    fetchDayCardsRange,
)(CalendarContainer);
