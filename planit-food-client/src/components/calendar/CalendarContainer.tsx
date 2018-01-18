import * as React from 'react';
import { Component } from 'react';
import Calendar from './Calendar';
import { graphql, compose } from 'react-apollo';
import { DayCard } from '../../models/DayCard';
import { ApiProps, ApiState } from '../../models/Api';
import * as moment from 'moment';
import { Moment } from 'moment';
import { dayCardsRange, addRecipe } from '../../api/dayCard';
import { Recipe } from '../../models/Recipes';

type queryVariables = { startDate: Moment, endDate: Moment };
type CalendarContainerProps = ApiProps<
    { getDayCards: DayCard[] },
    queryVariables,
    { addRecipeToCard: DayCard }>;
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
            />
        );
    }

    private createRecipe = (variables: queryVariables) => async (recipe: Recipe, id: number) => {
        const result = await this.props.mutate({
            variables: {
                newRecipe: recipe,
                idDayCard: id
            }
        });
        this.refetch(variables);
        return result.data.addRecipeToCard;
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
    graphql(addRecipe),
    graphql(dayCardsRange, {
        options: {
            variables: {
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month')
            }
        }
    }
    ))(CalendarContainer);
